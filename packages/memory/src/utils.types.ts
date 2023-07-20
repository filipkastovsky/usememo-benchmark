export type Never<T> = T & { [K in keyof T]: never };
