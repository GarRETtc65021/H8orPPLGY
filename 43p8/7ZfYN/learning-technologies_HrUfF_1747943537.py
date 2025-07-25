
client = SearchClient.create("08KMSERF1B", str(os.environ.get("KEY")))
def add_records(filename: str):
    with open(filename, newline="") as f:



if __name__ == "__main__":
    add_records("projects.csv")
