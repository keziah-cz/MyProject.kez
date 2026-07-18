from models import books


def line():
    print("=" * 90)


def show_all_books():
    line()
    print("📚 LIBRARY BOOK COLLECTION".center(90))
    line()
    print(f"{'No.':<5}{'Title':<35}{'Author':<25}{'Status':<12}{'Borrower'}")
    line()

    for i, book in enumerate(books, 1):
        status = "Borrowed" if book["borrowed"] else "Available"
        borrower = book["borrowed_by"] if book["borrowed"] else "-"
        print(f"{i:<5}{book['title']:<35}{book['author']:<25}{status:<12}{borrower}")

    line()


def show_available_books():
    line()
    print("✅ AVAILABLE BOOKS".center(90))
    line()

    found = False

    for i, book in enumerate(books, 1):
        if not book["borrowed"]:
            print(f"{i}. {book['title']} - {book['author']}")
            found = True

    if not found:
        print("No available books.")

    line()


def show_borrowed_books():
    line()
    print("📕 BORROWED BOOKS".center(90))
    line()

    found = False

    for i, book in enumerate(books, 1):
        if book["borrowed"]:
            print(f"{i}. {book['title']}  | Borrowed by: {book['borrowed_by']}")
            found = True

    if not found:
        print("No books are currently borrowed.")

    line()


def borrow_book():
    show_available_books()

    title = input("\nEnter Book Title: ")

    for book in books:

        if book["title"].lower() == title.lower():

            if book["borrowed"]:
                print("\n❌ Sorry! This book is already borrowed.")
                return

            student = input("Enter Student Name: ")

            book["borrowed"] = True
            book["borrowed_by"] = student

            print("\n✅ Book borrowed successfully!")
            return

    print("\n❌ Book not found.")


def return_book():
    show_borrowed_books()

    title = input("\nEnter Book Title: ")

    for book in books:

        if book["title"].lower() == title.lower():

            if not book["borrowed"]:
                print("\n⚠ This book is already available.")
                return

            book["borrowed"] = False
            book["borrowed_by"] = ""

            print("\n✅ Book returned successfully!")
            return

    print("\n❌ Book not found.")