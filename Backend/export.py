import csv

def export_csv(cards, path="flashon_cards.csv"):
    with open(path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Front", "Back"])
        for c in cards:
            writer.writerow([c.question, c.answer])
    return path
