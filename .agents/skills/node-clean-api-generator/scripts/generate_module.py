import os
import sys

def generate_module(module_name):
    base_path = os.path.join("backend", "src", "modules", module_name)
    # Correct template path based on common workspace structure
    template_path = os.path.join(".agents", "skills", "node-clean-api-generator", "resources", "templates")
    
    # Define subdirectories
    subdirs = ["controllers", "services", "repositories", "dtos", "validators", "models"]
    
    # Create directories
    for subdir in subdirs:
        dir_path = os.path.join(base_path, subdir)
        os.makedirs(dir_path, exist_ok=True)
        print(f"Created directory: {dir_path}")

    # Map templates to files
    files_to_create = {
        os.path.join("controllers", f"{module_name}.controller.js"): "controller.template.txt",
        os.path.join("services", f"{module_name}.service.js"): "service.template.txt",
        os.path.join("repositories", f"{module_name}.repo.js"): "repository.template.txt",
        os.path.join("dtos", f"{module_name}.dto.js"): "dto.template.txt",
        os.path.join("validators", f"{module_name}.validator.js"): "validator.template.txt",
        os.path.join("models", f"{module_name}.model.js"): "model.template.txt"
    }

    for rel_path, template_file in files_to_create.items():
        full_path = os.path.join(base_path, rel_path)
        t_path = os.path.join(template_path, template_file)
        
        if os.path.exists(t_path):
            with open(t_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Complex replacement including capitalization
            capitalized_name = module_name[0].upper() + module_name[1:]
            content = content.replace("{{moduleName}}", module_name)
            content = content.replace("{{moduleName.capitalize()}}", capitalized_name)
            content = content.replace("{{tableName}}", module_name + "s")
            
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Created file: {full_path}")
        else:
            print(f"Warning: Template not found {t_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate_module.py [module_name]")
        sys.exit(1)
    
    generate_module(sys.argv[1])
