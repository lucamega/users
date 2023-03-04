import { Component, ElementRef, ViewChild } from '@angular/core';
import { Error } from './error/error.model';
import { User } from './user/user.model';
import { UserService } from './user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild("idInput") idInputReference: ElementRef<HTMLInputElement>;
    @ViewChild("nameInput") nameInputReference: ElementRef<HTMLInputElement>;
    @ViewChild("ageInput") ageInputReference: ElementRef<HTMLInputElement>;
    @ViewChild("addressInput") addressInputReference: ElementRef<HTMLInputElement>;

    title = 'Users';
    users: User[] = [];

    constructor(private userService: UserService) {
        this.refreshUsers();
    }

    refreshUsers() {
        this.userService.getUsers().subscribe({
            next: (value) => {
                this.idInputReference.nativeElement.value = null;
                this.nameInputReference.nativeElement.value = null;
                this.ageInputReference.nativeElement.value = null;
                this.addressInputReference.nativeElement.value = null;

                this.users = value;
            }
        });
    }

    onSaveClick(user: User) {
        this.userService.editUser(user).subscribe({
            next: () => {
                this.refreshUsers();
            },
            error: (error: Error) => {
                alert(error.error);
            }
        });
    }

    onDeleteClick(id: string) {
        this.userService.deleteUser(id).subscribe({
            next: () => {
                this.refreshUsers();
            },
            error: (error: Error) => {
                alert(error.error);
            }
        });
    }

    onAddClick() {
        var id = this.idInputReference.nativeElement.value.trim();
        var name = this.nameInputReference.nativeElement.value.trim();
        var age = this.ageInputReference.nativeElement.value.trim();
        var address = this.addressInputReference.nativeElement.value.trim();

        if (!id) {
            alert("Invalid id.")
            return;
        }

        age = !age ? "0" : age;
        if (!this.isInt(age)) {
            alert("Invalid age.")
            return;
        }

        this.userService.addUser(new User(id, name, parseInt(age), address)).subscribe({
            next: () => {
                this.refreshUsers();
            },
            error: (error: Error) => {
                alert(error.error);
            }
        });
    }

    isInt(value: any) {
        if (isNaN(value)) {
            return false;
        }
        var x = parseFloat(value);
        return (x | 0) === x;
    }
}
