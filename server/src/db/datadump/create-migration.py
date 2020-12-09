# This code reads lines from the data dump at http://millionsongdataset.com/sites/default/files/AdditionalFiles/tracks_per_year.txt and outputs them to a new migration in the migration folder.
# You don't need to run it because I'm committing the migration. I included it just for record.
# If you did want to run it, you would place the text file in this directory.

import re

num_lines_to_read = 500
input_file_path = "./better data dump.txt"
output_file_path = "../migrations/V1.4__Add_more_songs.sql"
line_regex = re.compile(r"^(?:.*)\<SEP\>(?:.*)\<SEP\>(.*)\<SEP\>(.*)$")


with open(input_file_path, "r") as file:
    lines = [next(file) for i in range(num_lines_to_read)]

with open(output_file_path, "w") as file:
    for line in lines:
        match = line_regex.match(line)

        if match:
            artist = match.group(1).replace('"', "'")
            title = match.group(2).replace('"', "'")

            file.write(
                f'insert into `song` (`title`, `artist`) values ("{title}", "{artist}");\n'
            )
        else:
            print(f"match failed on line: {line}")
