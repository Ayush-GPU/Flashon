def next_interval(interval, rating):
    if rating == "Easy":
        return interval * 2
    if rating == "Hard":
        return max(1, interval // 2)
    return interval + 1
