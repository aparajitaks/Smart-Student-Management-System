# Use Case Diagram

```mermaid
useCaseDiagram
    actor Admin
    actor Teacher
    actor Student

    package "Smart Student Management System" {
        usecase "Login/Logout" as UC1
        usecase "Manage Users (Create/Update/Delete)" as UC2
        usecase "Transfer Student (Batch Hopper)" as UC3
        usecase "View Analytics Dashboard" as UC4
        usecase "Mark Attendance" as UC5
        usecase "Upload Marks/Assignments" as UC6
        usecase "View Attendance & Marks" as UC7
        usecase "View Notice Board" as UC8
        usecase "Publish Notices" as UC9
    }

    Admin --> UC1
    Admin --> UC2
    Admin --> UC3
    Admin --> UC4
    Admin --> UC8
    Admin --> UC9

    Teacher --> UC1
    Teacher --> UC5
    Teacher --> UC6
    Teacher --> UC7
    Teacher --> UC8
    Teacher --> UC9

    Student --> UC1
    Student --> UC7
    Student --> UC8
```
