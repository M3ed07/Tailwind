import { Component, Input ,ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent{
  @Input() tableHeader: any[] = [];
  @Input() tableData: any[] = [];
  selectedData: any = {};
  selectAll: any[] = [];
  items: MenuItem[] | undefined;
  @ViewChild('dt') dt: Table | undefined;
  // Dialog State
  dialogVisible: boolean = false;
  dialogTitle: string = '';
  dialogMode: 'add' | 'edit' | 'details' = 'add';
  formData: any = {}

  openDialog(mode: 'add' | 'edit' | 'details', data?: any) {
    this.dialogMode = mode;
    this.dialogTitle = mode === 'add' ? 'Add New User' : mode === 'edit' ? 'Edit User' : 'User Details';
    this.formData = data ? { ...data } : {};
    this.dialogVisible = true;
  }
  saveData(newData: any) {
    if (this.dialogMode === 'add') {
      const newId = this.tableData.length > 0 ? Math.max(...this.tableData.map(d => d.id)) + 1 : 1;
      this.tableData = [...this.tableData, { id: newId, ...newData }];
    } else if (this.dialogMode === 'edit') {
      const index = this.tableData.findIndex(d => d.id === newData.id);
      if (index !== -1) {
        this.tableData[index] = newData;
      }
    }
  }
  updateMenuItems() {
    this.items = [
      {
        label: 'Actions',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => this.openDialog('edit', this.selectedData)
          },
          {
            label: 'Details',
            icon: 'pi pi-info-circle',
            command: () => this.openDialog('details', this.selectedData)
          },
          {
            label: this.selectedData.permission === 'User' ? 'Promote to Admin' : 'Demote to User',
            icon: this.selectedData.permission === 'User' ? 'pi pi-user-plus' : 'pi pi-user-minus',
            command: () => this.toggleUserRole()
          }          
        ]
      }
    ];
  }
  setSelectedData(tableData: any) {
    this.selectedData = tableData;
    this.updateMenuItems();  
  }
  filterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    if (this.dt) {
      this.dt.filterGlobal(value, 'contains');
    }
  }
  toggleUserRole() {
    const newRole = this.selectedData.permission === 'User' ? 'Admin' : 'User';
  
    Swal.fire({
      title: `Change role to ${newRole}?`,
      text: `Are you sure you want to ${newRole === 'Admin' ? 'promote': 'demote'} this user?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, set to ${newRole}`,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#4baaf5',
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectedData.permission = newRole;
        Swal.fire(
          'Updated!',
          `User role has been changed to ${newRole}.`,
          'success'
        );
      }
    });
  }
  deleteSelectedData() {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete the selected?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#F87282',
      confirmButtonText: 'Yes, delete them!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectAll.forEach(Data => {
          this.tableData = this.tableData.filter(c => c.id !== Data.id);
        });
        this.selectAll = [];
        Swal.fire('Deleted!', 'Selected Data have been deleted.', 'success');
      }
    });
  }
}