def show_visitors(visitors):
    print("============================")
    print("=== BARANGAY VISITOR LOG ===")
    print("============================")

    if len(visitors) == 0:
        print("No visitors recorded.")
    else:
        for i, visitor in enumerate(visitors, start=1):
            print(f"{i}. Name: {visitor['name']}")
            print(f"   Purpose: {visitor['purpose']}")

    print(f"\nTotal visitors recorded: {len(visitors)}")