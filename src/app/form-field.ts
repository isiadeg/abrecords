export interface FormField {
    fieldApiName: string,
          fieldHint: string,
          fieldShown: boolean,
          fieldType: string,
          fieldPrefix: string,
          fieldLabel: string,
          dbKey: string,
          placeholder: string,
          required: boolean,
          value?: any
}

export interface FormMetaData{
    
          form_name: string,
          form_exp: string,
        
    
    
}