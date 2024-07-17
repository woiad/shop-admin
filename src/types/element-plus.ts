import { ElForm } from 'element-plus'
import { FormItemRule } from 'element-plus/lib/components/form/src/types'

export type IElForm = InstanceType<typeof ElForm>

export type IElFormItemRule = Record<string, FormItemRule[]>
