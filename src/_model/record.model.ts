export interface RecordVersion {
  version: string;
  active: boolean;
}

export interface Record {
  id: string;
  name: string;
  versions: RecordVersion[];
}
