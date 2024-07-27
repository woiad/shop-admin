import { FormItemRule } from 'element-plus/lib/components/form/src/types'

export interface ISelectionOptions {
  label: string,
  value: number
}

export interface IFormRule {
  title: string,
  field: string,
  props?: Record<string, any>,
  type: string,
  validate?: FormItemRule
  value: string,
  options?: ISelectionOptions[]
}

export interface IFormData {
  action: string,
  infor: string,
  method: string,
  status: boolean,
  tite: string,
  rules: IFormRule[]
}
