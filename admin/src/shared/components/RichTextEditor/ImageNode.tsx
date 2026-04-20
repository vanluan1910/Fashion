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
  import ImageComponent from './ImageComponent';
  
  export interface ImagePayload {
    altText: string;
    src: string;
    width?: number;
    height?: number;
    key?: NodeKey;
  }
  
  export type SerializedImageNode = Spread<
    {
      altText: string;
      src: string;
      width?: number;
      height?: number;
    },
    SerializedLexicalNode
  >;
  
  export class ImageNode extends DecoratorNode<React.ReactNode> {
    __src: string;
    __altText: string;
    __width?: number;
    __height?: number;
  
    static getType(): string {
      return 'image';
    }
  
    static clone(node: ImageNode): ImageNode {
      return new ImageNode(
        node.__src,
        node.__altText,
        node.__width,
        node.__height,
        node.getKey(),
      );
    }
  
    static importDOM(): DOMConversionMap | null {
      return {
        img: (node: Node) => ({
          conversion: (domNode: Node): DOMConversionOutput => {
            if (domNode instanceof HTMLImageElement) {
              const { src, alt, width, height } = domNode;
              const payload = {
                src,
                altText: alt,
                width: width || undefined,
                height: height || undefined,
              };
              return { node: $createImageNode(payload) };
            }
            return { node: null };
          },
          priority: 0,
        }),
      };
    }
  
    constructor(
      src: string,
      altText: string,
      width?: number,
      height?: number,
      key?: NodeKey,
    ) {
      super(key);
      this.__src = src;
      this.__altText = altText;
      this.__width = width;
      this.__height = height;
    }
  
    exportDOM(): DOMExportOutput {
      const element = document.createElement('img');
      element.setAttribute('src', this.__src);
      element.setAttribute('alt', this.__altText);
      if (this.__width) element.setAttribute('width', this.__width.toString());
      if (this.__height) element.setAttribute('height', this.__height.toString());
      return { element };
    }
  
    createDOM(config: EditorConfig): HTMLElement {
      const span = document.createElement('span');
      const theme = config.theme;
      const className = theme.image;
      if (className !== undefined) {
        span.className = className;
      }
      return span;
    }
  
    updateDOM(): false {
      return false;
    }
  
    static importJSON(serializedNode: SerializedImageNode): ImageNode {
      const { src, altText, width, height } = serializedNode;
      return $createImageNode({
        altText,
        height,
        src,
        width,
      });
    }
  
    exportJSON(): SerializedImageNode {
      return {
        altText: this.__altText,
        height: this.__height,
        src: this.__src,
        type: 'image',
        version: 1,
        width: this.__width,
      };
    }
  
    setWidthAndHeight(width?: number, height?: number): void {
      const writable = this.getWritable();
      writable.__width = width;
      writable.__height = height;
    }
  
    decorate(): React.ReactNode {
      return (
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          nodeKey={this.getKey()}
        />
      );
    }
  }
  
  export function $createImageNode({
    altText,
    height,
    src,
    width,
    key,
  }: ImagePayload): ImageNode {
    return new ImageNode(src, altText, width, height, key);
  }
  
  export function $isImageNode(
    node: LexicalNode | null | undefined,
  ): node is ImageNode {
    return node instanceof ImageNode;
  }
  
