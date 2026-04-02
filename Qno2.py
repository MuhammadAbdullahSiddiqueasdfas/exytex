print("+========Student Management system=========+")

Student_names = ["Abdullah", "Hassan", "Ali", "Hussain", "Ahad"]  

def Matching(prompt, Student_names):
    if prompt in Student_names:
        print("You have found it!")
        print(f"Index: {Student_names.index(prompt)}")
    else:
        print("Invalid name enter by you")

for i in range(len(Student_names)):
    print(f"Index {i}: {Student_names[i]}")

prompt = input("Enter the user name which you want to search?: ")
Matching(prompt, Student_names)
