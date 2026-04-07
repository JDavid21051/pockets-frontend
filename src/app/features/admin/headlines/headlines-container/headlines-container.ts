import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SkyTable } from '@/shared/ui/organisms/sky-table/sky-table';
import type { SkyColumnsConfig } from '@/domain/models/uix/sky-table.model';
import type { HeadlinesModelList } from '@/domain/models/headlines/headlines.model';
import { HeadlinesStore } from '@/infra/store/headlines.store';
import { readonly } from '@angular/forms/signals';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'krih-headlines-container',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SkyTable,
  ],
  templateUrl: './headlines-container.html',
  styleUrl: './headlines-container.css',
})
export class HeadlinesContainer implements OnInit {
  private readonly store = inject(HeadlinesStore);
  protected columnsConfig: SkyColumnsConfig[] = [
    { field: 'headlines_name', header: 'Nombre', type: 'text' },
    { field: 'document_type', header: 'Progreso %', type: 'text' },
    { field: 'headlines_document', header: 'Fruta', type: 'text' },
  ];

  // protected dataTableSource!: ;
  protected dataTableSource: MatTableDataSource<HeadlinesModelList> =
    new MatTableDataSource<HeadlinesModelList>([]);

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    console.log({ users });

    // Assign the data to the data source for the table to render
    this.dataTableSource.data = [...users];
    // this.dataTableSource = new MatTableDataSource<HeadlinesModelList>(users);
    //this.dataTableSource.renderRows();
  }

  ngOnInit() {
    this.store.getHeadlines();
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): HeadlinesModelList {
  const name = `${NAMES[Math.round(Math.random() * (NAMES.length - 1))]} ${NAMES[
    Math.round(Math.random() * (NAMES.length - 1))
  ].charAt(0)}.`;

  return {
    id: id.toString(),
    headlines_name: name,
    document_type: Math.round(Math.random() * 100),
    headlines_document: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
    created_at: new Date().toString(),
    status: true,
  };
}
