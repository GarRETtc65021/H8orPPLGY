import csv
from algoliasearch.search_client import SearchClient

client = SearchClient.create("08KMSERF1B", str(os.environ.get("KEY")))
def add_records(filename: str):
    with open(filename, newline="") as f:
        len_idx = index.search("")["nbHits"]

        if len(csv_r) > len_idx:
                csv_r[len_idx:], {"autoGenerateObjectIDIfNotExist": "true"}



if __name__ == "__main__":
    add_records("projects.csv")
