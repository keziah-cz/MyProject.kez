<div align="center">

# 🐍 Python Console Projects

### 📚 Library Book Borrowing System & 🏡 Barangay Visitor Log System

A collection of beginner-friendly Python console applications built to practice programming fundamentals such as functions, loops, lists, dictionaries, modules, and user interaction.

![Python](https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge&logo=python)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Console-lightgrey?style=for-the-badge)

</div>

---

# 📂 Projects

| Project | Description |
|---------|-------------|
| 📚 **Library Book Borrowing System** | A console application for borrowing and returning library books. |
| 🏡 **Barangay Visitor Log System** | A visitor logging system that records visitor information and displays all entries. |

---

# 📚 Library Book Borrowing System

## 📖 Overview

The **Library Book Borrowing System** is a simple console-based application that manages a collection of library books. Users can browse available books, borrow books, return books, and view borrowed records.

---

## ✨ Features

✅ View all books

✅ Borrow a book

✅ Return a book

✅ View available books

✅ View borrowed books

✅ Easy-to-use menu interface

---

## 📁 Project Structure

```text
BookSystem_07-17-26
│
├── 📄 main.py
├── 📄 models.py
└── 📄 views.py
```

---

## 📄 Files

| File | Description |
|------|-------------|
| **main.py** | Displays the menu and controls the program flow. |
| **models.py** | Stores all book data using Python dictionaries. |
| **views.py** | Contains the functions used for displaying and managing books. |

---

## 📚 Book Data Structure

```python
{
    "title": "Python Basics",
    "author": "Ana Cruz",
    "borrowed": False,
    "borrowed_by": ""
}
```

---

## 🖥️ Menu

```text
╔══════════════════════════════════════════════════════╗
║          📚 LIBRARY BOOK BORROWING SYSTEM 📚         ║
╠══════════════════════════════════════════════════════╣
║ 1. Show All Books                                   ║
║ 2. Borrow a Book                                    ║
║ 3. Return a Book                                    ║
║ 4. Show Available Books                             ║
║ 5. Show Borrowed Books                              ║
║ 6. Exit                                             ║
╚══════════════════════════════════════════════════════╝
```

---

## 💡 Python Concepts Used

- 📦 Modules
- 🔁 Loops
- ⚙️ Functions
- 📋 Lists
- 📖 Dictionaries
- 🎯 Conditional Statements
- ⌨️ User Input

---

# 🏡 Barangay Visitor Log System

## 📖 Overview

The **Barangay Visitor Log System** is a console application designed to record visitor information. It stores visitor names and purposes, then displays a complete visitor log.

---

## ✨ Features

✅ Record visitor names

✅ Record visitor purposes

✅ Store visitor information

✅ Display visitor records

✅ Show total visitors

---

## 📁 Project Structure

```text
BrgyActiveLog_07-17-26
│
├── 📄 main.py
├── 📄 visitor.py
└── 📄 display.py
```

---

## 📄 Files

| File | Description |
|------|-------------|
| **main.py** | Runs the application and controls the visitor logging process. |
| **visitor.py** | Handles user input and stores visitor information. |
| **display.py** | Displays all visitor records and total visitors. |

---

## 👤 Visitor Data Structure

```python
{
    "name": "Juan Dela Cruz",
    "purpose": "Meeting"
}
```

---

## 🖥️ Sample Output

```text
Enter visitor name: Juan Dela Cruz
Enter visitor purpose: Meeting

Add another visitor? (Y/N): N

============================
=== BARANGAY VISITOR LOG ===
============================

1. Name: Juan Dela Cruz
   Purpose: Meeting

Total visitors recorded: 1
```

---

# 🚀 Getting Started

## Requirements

- Python 3.x
- Visual Studio Code (Recommended)

---

## ▶️ Run the Library Book Borrowing System

```bash
cd BookSystem_07-17-26
python main.py
```

---

## ▶️ Run the Barangay Visitor Log System

```bash
cd BrgyActiveLog_07-17-26
python main.py
```

---

# 🧠 Skills Practiced

- ✔ Python Basics
- ✔ Modular Programming
- ✔ Lists & Dictionaries
- ✔ Functions
- ✔ Loops
- ✔ User Input Handling
- ✔ Command-Line Applications
- ✔ Organizing Multiple Python Files

---

# 📸 Project Preview

## 📚 Library Book Borrowing System

```text
📚 LIBRARY BOOK BORROWING SYSTEM

1. Show All Books
2. Borrow a Book
3. Return a Book
4. Show Available Books
5. Show Borrowed Books
6. Exit
```

---

## 🏡 Barangay Visitor Log System

```text
🏡 BARANGAY VISITOR LOG

Name    : Juan Dela Cruz
Purpose : Meeting

Total Visitors: 1
```

---

# 📌 Notes

> **Library Book Borrowing System**
>
> Based on the provided source code, `views.py` currently only contains the list of books. The functions called in `main.py` (such as `show_all_books()`, `borrow_book()`, and `return_book()`) should be implemented inside `views.py` for the program to work correctly.

---

<div align="center">

### 🌟 Thank you for checking out these Python Projects!

Made with ❤️ using **Python**

</div>