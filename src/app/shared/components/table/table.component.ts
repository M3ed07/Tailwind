import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnChanges{
  @Input() tableHeader: any[] = [];
  @Input() tableData: any[] = [];
  selectedData: any = {};
  selectAll: any[] = [];
  items: MenuItem[] | undefined;
  @ViewChild('dt') dt: Table | undefined;

  ngOnInit() {
    this.updateMenuItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['title'] || changes['tableHeaders'] || changes['tableData']) {
      this.updateMenuItems();
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
            command: () => this.editData(this.selectedData)
          },
          {
            label: 'Details',
            icon: 'pi pi-info-circle',
            command: () => this.showDetails(this.selectedData)
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
  addNew() {
    let inputFields = '';
    this.tableHeader.forEach((header) => {
      if (header.type === 'select') {
        inputFields += `
        <div class="inline-block w-[360px] p-4 font-zain">
            <div class="flex flex-col w-full">
                <label for="${header.field}" class="text-base ml-2 text-start font-semibold text-darkCol opacity-80 mb-2">${header.header}</label>
                <select id="${header.field}" class="bg-transparent border-[0.1px] dark:border-[rgba(255,255,255,0.2)] rounded-md h-10 px-2 text-base appearance-none">
                ${header.options
                  .map((option: string) => `<option value="${option}">${option}</option>`)
                  .join('')}
                </select>
            </div>
        </div>
        `;
      } else if (header.type === 'file') {
        inputFields += `
        <div class="inline-block w-[360px] p-4 font-zain">
            <div class="flex flex-col w-full">
                <label for="${header.field}" class="text-base ml-2 text-start font-semibold text-darkCol opacity-80 mb-2">${header.header}</label>
                <input type="file" id="${header.field}" class="bg-transparent border-[0.1px] dark:border-[rgba(255,255,255,0.2)] rounded-md h-10 px-2 text-base" accept="image/*">
            </div>
        </div>
        `;
      } else {
        inputFields += `
        <div class="inline-block w-[360px] p-4 font-zain">
            <div class="flex flex-col w-full">
                <label for="${header.field}" class="text-base ml-2 text-start font-semibold text-darkCol opacity-80 mb-2">${header.header}</label>
                <input type="${header.type}" id="${header.field}" class="bg-transparent border-[0.1px] dark:border-[rgba(255,255,255,0.2)] rounded-md h-10 px-2 text-base" placeholder="${header.field}">
            </div>
        </div>
        `;
      }
    });
  
    Swal.fire({
      title: `Add New`,
      html: inputFields,
      showCancelButton: true,
      confirmButtonText: 'Add',
      confirmButtonColor: '#4baaf5',
      cancelButtonText: 'Cancel',
      width: '1200px',
      preConfirm: () => {
        const newData: any = {};
        // Get the values from the input fields
        this.tableHeader.forEach((header) => {
          if (header.type === 'file') {
            const fileInput = document.getElementById(header.field) as HTMLInputElement;
            const file = fileInput?.files?.[0];
            newData[header.field] = file ? URL.createObjectURL(file) : 'N/A';
          } else {
            const inputElement = (document.getElementById(header.field) as HTMLInputElement).value;
            newData[header.field] = inputElement || 'N/A';
          }
        });
        return newData;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newId = this.tableData.length > 0 ? Math.max(...this.tableData.map(d => d.id)) + 1 : 1;
        this.tableData = [...this.tableData, { id: newId, ...result.value }];
    
        Swal.fire('Added!', 'New data has been added.', 'success');
      }
    });
  }
    
    showDetails(tableData: any | undefined) {
    if (!tableData) return;
    let detailsHtml = '';
    this.tableHeader.forEach(header => {
        const value = tableData[header.field] || 'N/A';

        if (header.type === 'file' && value !== 'N/A') {
            detailsHtml += `
                <p class="swal2-input text-start font-zain"><strong>${header.field} : <img src="${value}" alt="Image" class="inline w-9 h-9" /></strong></p>
            `;
        }else if(header.type === 'url'){
          detailsHtml += `
                <p class="swal2-input text-start font-zain"><strong>${header.field} : </strong><a target="_blank" href=${value} class="text-lightRed underline">${value}</a></p>
            `;
        } else {
            detailsHtml += `
                <p class="swal2-input text-start font-zain"><strong>${header.field} :</strong> ${value}</p>
            `;
        }
    });

    Swal.fire({
        title: 'Details',
        html: detailsHtml,
        confirmButtonColor: '#4baaf5',
        confirmButtonText: 'Close'
    });
}

  editData(tableData: any | undefined) {
    if (!tableData) return;
    let inputFields = '';
    this.tableHeader.forEach((header) => {
      const value = tableData[header.field] || '';
      if (header.field === 'permission') {
        return;
      }
      if (header.type === 'select') {
        inputFields += `
        <div class="inline-block w-[360px] p-4 font-zain">
          <div class="flex flex-col w-full">
            <label for="${header.field}" class="text-base ml-2 text-start font-semibold text-darkCol opacity-80 mb-2">${header.header}</label>
            <select id="${header.field}" class="bg-transparent border-[0.1px] dark:border-[rgba(255,255,255,0.2)] rounded-md h-10 px-2 text-base appearance-none" >
              ${header.options
                .map(
                  (option: string) =>
                    `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`
                )
                .join('')}
            </select>
          </div>
        </div>
        `;
      } else if (header.type === 'file') {
        inputFields += `
        <div class="inline-block w-[360px] p-4 font-zain">
            <div class="flex flex-col w-full">
                <label for="${header.field}" class="text-base ml-2 text-start font-semibold text-darkCol opacity-80 mb-2">${header.header}</label>
                <input type="file" id="${header.field}" class="bg-transparent border-[0.1px] dark:border-[rgba(255,255,255,0.2)] rounded-md h-10 px-2 text-base" accept="image/*">
            </div>
        </div>
        `;
      } else {
        inputFields += `
        <div class="inline-block w-[360px] p-4 font-zain">
          <div class="flex flex-col w-full">
            <label for="${header.field}" class="text-base ml-2 text-start font-semibold text-darkCol opacity-80 mb-2">${header.header}</label>
            <input type="${header.type}" id="${header.field}" class="bg-transparent border-[0.1px] dark:border-[rgba(255,255,255,0.2)] rounded-md h-10 px-2 text-base" placeholder="${header.field}" value="${value}">
          </div>
        </div>
        `;
      }
    });
  
    Swal.fire({
      title: 'Edit Data',
      html: inputFields,
      showCancelButton: true,
      confirmButtonText: 'Save',
      confirmButtonColor: '#4baaf5',
      cancelButtonText: 'Cancel',
      width: '1200px',
      preConfirm: () => {
        const updatedData: any = {};
        this.tableHeader.forEach((header) => {
          if (header.type === 'file') {
            const fileInput = document.getElementById(header.field) as HTMLInputElement;
            const file = fileInput?.files?.[0];
            updatedData[header.field] = file ? URL.createObjectURL(file) : tableData[header.field];
          } else {
            const inputElement = (document.getElementById(header.field) as HTMLInputElement).value;
            updatedData[header.field] = inputElement || 'N/A';
          }
        });
        return updatedData;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.saveData(result.value, tableData.id);
        Swal.fire('Updated!', 'Data has been updated.', 'success');
      }
    });
  }


  saveData(updatedData: any, id: number) {
    const index = this.tableData.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.tableData[index] = { id, ...updatedData };
      this.tableData = [...this.tableData];
    }
    this.selectedData = undefined;
  }

  setSelectedData(tableData: any) {
    this.selectedData = tableData;
    this.updateMenuItems();  
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

  filterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    if (this.dt) {
      this.dt.filterGlobal(value, 'contains');
    }
  }
}