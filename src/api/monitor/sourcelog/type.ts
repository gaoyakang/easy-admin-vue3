// types.ts
export interface ResponseData {
  code?: number;
  message?: string;
  success?: boolean;
}

export interface CpuType {
  cpuNum: number;
  total: number;
  sys: string;
  used: string;
  wait: number;
  free: string;
}

export interface MemType {
  total: string;
  used: string;
  free: string;
  usage: string;
}

export interface SysType {
  computerName: string;
  userDir: string;
  osName: string;
  osArch: string;
}

export interface FileType {
  dirName: string;
  typeName: string;
  total: string;
  used: string;
  free: string;
  usage: string;
}

export interface GetSourcelogResponseData extends ResponseData {
  data: {
    cpu: CpuType;
    mem: MemType;
    sys: SysType;
    sysFiles: FileType[];
  };
}
