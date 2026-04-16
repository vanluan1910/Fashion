---
name: Node.js Clean Architecture API Generator
description: Automation for creating new modules and APIs following the Clean Architecture pattern in the backend folder.
---

# 🏗️ Node.js Clean Architecture API Generator

This skill automates the creation of backend modules following the **Feature-based + Clean Architecture** pattern.

## 🧱 Architecture Reference
Every module must reside in `backend/src/modules/[module_name]` and contain:
- `controllers/[module_name].controller.js`: Handle requests/responses.
- `services/[module_name].service.js`: Business logic.
- `repositories/[module_name].repo.js`: Direct database interactions.
- `dtos/[module_name].dto.js`: Data mapping.
- `validators/[module_name].validator.js`: Input validation.

## 🚀 Usage

### 1. Generating a New Module
When asked to create a new backend module (e.g., "products"), follow these steps:

1.  **Run the generation script**:
    ```powershell
    python .agents/skills/node-clean-api-generator/scripts/generate_module.py [module_name]
    ```
2.  **Define the Data Source**: If a DB schema is provided, update the `repo.js` and `dto.js`.
3.  **Register Routes**: Manually add the new routes to `backend/src/app/routes.js`.

### 2. Manual Implementation Rules
If implementing manually, ensure:
- **No logic in Controllers**: They only call services.
- **No DB calls in Services**: They only call repositories.
- **Strict folder structure**: Do not mix layers.

## 🛠️ Resources
Templates are located in `.agents/skills/node-clean-api-generator/resources/templates/`.
- `controller.template.txt`
- `service.template.txt`
- `repository.template.txt`
- `dto.template.txt`
- `validator.template.txt`
