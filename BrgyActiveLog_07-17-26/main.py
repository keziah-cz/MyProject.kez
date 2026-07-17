from visitor import add_visitor
from display import show_visitors

visitors = []

while True:
    add_visitor(visitors)

    choice = input("Add another visitor? (Y/N): ").strip().upper()

    if choice != "Y":
        break

show_visitors(visitors)