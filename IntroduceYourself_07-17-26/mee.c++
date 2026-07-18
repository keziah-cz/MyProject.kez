#include <iostream>
using namespace std;


void line() {
    cout << "--------------------------------------------------\n";
}

void displayProfile(string pet, string name, string birthday, string address,
                    string song, string motivation, string support) {

    line();
    cout << "                 ABOUT ME PROFILE\n";
    line();

    if (pet == "dog") {
        cout << "  Preference : DOG PERSON  🐶\n";
    } else {
        cout << "  Preference : CAT PERSON  🐱\n";
    }

    line();

    cout << "  Name       : " << name << endl;
    cout << "  Birthday   : " << birthday << endl;
    cout << "  Address    : " << address << endl;
    cout << "  Fav Song   : " << song << endl;
    cout << "  Motivation : " << motivation << endl;
    cout << "  Support    : " << support << endl;

    line();
    cout << "  Thanks for sharing!\n";
    line();
}

int main() {

    string pet = "dog";
    string name = "Kyle Keziah Caspillo (Kyle or Kez)";
    string birthday = "01/08/2006";
    string address = "Tagbac, Jaro, Iloilo City";
    string song = "Nobody's Son by Sabrina Carpenter";
    string motivation = "My future, and my family and friends";
    string support = "The instructions were clear, and enough time was given to perform the activities";

    displayProfile(
        pet,
        name,
        birthday,
        address,
        song,
        motivation,
        support
    );

    return 0;
}