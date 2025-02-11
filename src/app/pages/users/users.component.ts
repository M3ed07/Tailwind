import { Component } from '@angular/core';
import { TableData, TableHeader } from '../../core/models/user';
// todo 1 : Phone number validation
// todo 2 : Rating process
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  title = 'User Management';
  description = 'Manage Syrian Youth Baghdad Gathering members and admins. Add, edit, delete users, and assign administrative roles.';  

  tableHeader: TableHeader[] = [
    { field: 'fullName', header: 'Full Name', type: 'text' },
    { field: 'gender', header: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
    { field: 'birthdate', header: 'Birthdate', type: 'date' },
    { field: 'address', header: 'Address', type: 'text' },
    { field: 'phone', header: 'Phone Number', type: 'text' },
    { field: 'username', header: 'Username', type: 'text' },
    { field: 'password', header: 'Password', type: 'text' },
    { field: 'rating', header: 'Rating', type: 'number' },
    { field: 'permission', header: 'Permission', type: 'select', options: ['Admin', 'User'] },
  ];

  tableData: TableData[] = [
    {
      id: 1,
      fullName: 'John Doe',
      gender: 'Male',
      birthdate: '1990-05-15',
      address: '123 Street, City',
      phone: '555-1234',
      username: 'johndoe',
      password: 'password123',
      rating: 4.5,
      permission: 'Admin',
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      gender: 'Female',
      birthdate: '1995-10-22',
      address: '456 Avenue, City',
      phone: '555-5678',
      username: 'janesmith',
      password: 'password123',
      rating: 4.8,
      permission: 'User',
    },
  ];
}