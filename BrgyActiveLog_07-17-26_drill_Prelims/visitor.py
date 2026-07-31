def add_visitor(visitors):
    name = input("Enter visitor name: ")
    purpose = input("Enter visitor purpose: ")

    visitor = {
        "name": name,
        "purpose": purpose
    }

    visitors.append(visitor)