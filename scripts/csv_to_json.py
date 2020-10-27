import csv
import re
import json

from pathlib import Path
from typing import Any, Dict, Union
import sys

COLUMN_DELIM=","

__is_number = re.compile(r"^[-+]?[0-9]+$")

__is_float = re.compile(r"^[-+]?[\d\.]+$")

def is_number(value: Union[str, int]) -> bool:
    if type(value) is int:
        return True

    value = str(value)

    if re.match(__is_number, value):
        return True

    return False


def is_float(value: Union[str, int]) -> bool:
    if isinstance(value, float):
        return True

    value = str(value)

    if re.match(__is_float, value):
        return True

    return False


def cast_field(field: Any) -> Any:
    if is_float(field):
        return float(field)

    if is_number(field):
        return int(field)

    return field


def csv_to_json(file_path: str, column_name: str = None) -> Dict:
    source_file = Path(file_path)

    if not source_file.is_file():
        raise Exception("Not a file: {}".format(p))


    out_records = []

    with source_file.open() as fh:
        top_line = fh.readline().strip()
        column_names = top_line.split(COLUMN_DELIM)

        csvreader = csv.DictReader(fh, fieldnames=column_names)

        for row in csvreader:
            if column_name:
                if not column_name in row:
                    raise Exception("Could not find column {}".format(column_name))

                value = cast_field(row[column_name])
                out_records.append(value)
                continue

            __rec = {
                k: cast_field(v)
                for k, v in row.items()
            }
            out_records.append(__rec)


    out_json = json.dumps(out_records, indent=4)

    print(out_json)

if __name__ == "__main__":

    csv_to_json(sys.argv[1], sys.argv[2])
