import { Injectable } from "@angular/core";

@Injectable()

export class DropService{

    countries:string[]=[
        'Egypt',
        'UAE',
        'Spain',
        'America',
        'Italy',
        'France',
        'Germany',
        'Moroco',
        'Qatar'
    ]
    categories:string[]=[
        'Programing',
        'languages',
        'Motivational',
        'Finance',
        'Marketing',
        'Engineering',
        'Design'
    ]
    level:string[]=[
        'Advanced',
        'Intermediate',
        'Begginer'
    ]
    languages:string[]=[
        'English',
        'Arabic',
        'Spain',
        'French'
    ]
}