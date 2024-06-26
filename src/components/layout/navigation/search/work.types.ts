import { IWork } from "@/components/shared/types/work.types"

export interface IWidgetWork
	extends Pick<
		IWork,
		'_id' | 'tags'  | 'title' | 'slug' | 'images' | 'contractorId'
	> {
  workType: any;
}

export interface IWorkList {
	title: string
	link: string
	works: IWidgetWork[]
}