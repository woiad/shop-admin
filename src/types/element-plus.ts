import { ElForm, ElDialog, ElTree } from 'element-plus'
import { FormItemRule } from 'element-plus/lib/components/form/src/types'

export type IElForm = InstanceType<typeof ElForm>
export type IElDialog = InstanceType<typeof ElDialog>
export type IElTree = InstanceType<typeof ElTree>

export type IElFormItemRule = Record<string, FormItemRule[]>
