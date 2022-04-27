## Local Setup

1. To install poetry, run in command line: `curl -sSL https://install.python-poetry.org | python3 -`
2. To install dependencies: `cd` into directory that contains `pyproject.toml` then `poetry install`
3. Run DB migrations: `poetry run ./prestart.sh` (only required once)
4. Run the FastAPI server: `poetry run ./run.sh`
5. Open http://localhost:8001/

Note: If using VSCode, it might not recognize poetry's venv, ie installed packages can't be imported. Run `poetry show -v` and copy path into VSCode's Python: Select Interpreter