import {
  DecoratorNode,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
} from 'lexical';
import React from 'react';
import YouTubeComponent from '@/shared/components/RichTextEditor/YouTubeComponent';

export interface YouTubePayload {
  videoID: string;
  format?: 'standard' | 'wide';
  key?: NodeKey;
}

export type SerializedYouTubeNode = Spread<
  {
    videoID: string;
    format?: 'standard' | 'wide';
  },
  SerializedLexicalNode
>;

export class YouTubeNode extends DecoratorNode<React.ReactNode> {
  __videoID: string;
  __format: 'standard' | 'wide';

  static getType(): string {
    return 'youtube';
  }

  static clone(node: YouTubeNode): YouTubeNode {
    return new YouTubeNode(node.__videoID, node.__format, node.getKey());
  }

  static importJSON(serializedNode: SerializedYouTubeNode): YouTubeNode {
    const { videoID, format } = serializedNode;
    return $createYouTubeNode({ videoID, format });
  }

  exportJSON(): SerializedYouTubeNode {
    return {
      videoID: this.__videoID,
      format: this.__format,
      type: 'youtube',
      version: 1,
    };
  }

  constructor(videoID: string, format?: 'standard' | 'wide', key?: NodeKey) {
    super(key);
    this.__videoID = videoID;
    this.__format = format || 'standard';
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('iframe');
    element.setAttribute('data-lexical-youtube', this.__videoID);
    element.setAttribute('width', '560');
    element.setAttribute('height', '315');
    element.setAttribute('src', `https://www.youtube.com/embed/${this.__videoID}`);
    element.setAttribute('frameborder', '0');
    element.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    element.setAttribute('allowfullscreen', 'true');
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      iframe: (domNode: HTMLElement) => {
        const videoID = domNode.getAttribute('data-lexical-youtube');
        if (videoID) {
          return {
            conversion: () => ({
              node: $createYouTubeNode({ videoID }),
            }),
            priority: 1,
          };
        }
        return null;
      },
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const div = document.createElement('div');
    div.style.display = 'contents';
    return div;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): React.ReactNode {
    return (
      <YouTubeComponent
        videoID={this.__videoID}
        format={this.__format}
        nodeKey={this.getKey()}
      />
    );
  }
}

export function $createYouTubeNode({ videoID, format }: YouTubePayload): YouTubeNode {
  return new YouTubeNode(videoID, format);
}

export function $isYouTubeNode(node: LexicalNode | null | undefined): node is YouTubeNode {
  return node instanceof YouTubeNode;
}
