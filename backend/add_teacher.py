import pickle
import os

name = input("Enter Teacher Name: ")
email = input("Enter Teacher Email: ")
subject = input("Enter Subject Name: ")
password = input("Enter Teacher Password: ")

db_file_name = f"db/teachers.pickle"

if not os.path.exists(db_file_name):
    pickle.dump({}, open(db_file_name, 'wb'))

db = pickle.load(open(db_file_name, 'rb'))

db[email] = {
    'name': name,
    'subject': subject,
    'password': password
}

pickle.dump(db, open(db_file_name, 'wb'))
print("Teacher added into Database!")
