import { Component, OnInit } from '@angular/core';
import {FileUploader, FileItem } from 'ng2-file-upload';
@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent implements OnInit {
  public title = 'Click Here to download sample Excel file';
  public isSuccess: boolean;
  btnUploadIsDisabled: boolean; // 使上传按钮失效
  selectFileName: any = 'No file selected';
  public stockExchange: string;
  public companyName: string;
  public record: number;
  public fromDate: string;
  public toDate: string;
  public res: any;
  uploader: FileUploader = new FileUploader({
    // url: 'http://9.112.77.89:8080/import/data',
    url: 'http://localhost:8080/import/data',
    method: 'POST',
    itemAlias: 'file',
    autoUpload: false,
    removeAfterUpload: true,
    allowedFileType: ['xlsx', 'xls']
  });

  constructor() {
    // Note: 必须移除cookie，否则跨越设置的'*'通配符将不会生效，现在backend设置是'*', 如果换成是具体到某个域名的话，这个问题将不会存在
    // 对于ng2-file-upload上传去掉cookie，只需在上传之前设置FileItem的属性withCredentials=false即可
    this.uploader.onBeforeUploadItem = (fileItem: FileItem) => {
      fileItem.withCredentials = false;
    };
  }

  ngOnInit() {
    // this.selectFile();
    // this.uploadFile();
  }

  // 这里是文件选择完成后的操作处理
  selectedFileOnChanged(event: any) {
    // 打印文件选择名称
    this.btnUploadIsDisabled = false;
    // “\”是转义字符，所以要表示一个字符串“\”就要用“\\”
    this.selectFileName = event.target.value.substr(event.target.value.lastIndexOf('\\') + 1);
    console.log(event);
    console.log(this.selectFileName);
  }

  uploadFile() {
    // 上传
    this.btnUploadIsDisabled = true;
    if (this.selectFileName === 'No file selected') {
        alert ('Please select a file!');
    } else {
      this.uploader.queue[0].onError = (response, status, headers) => {
        alert ('Network error, please retry!');
      };
      this.uploader.queue[0].onSuccess = (response, status, headers) => {
        // 上传文件成功
        if (status === 200) {
          // 上传文件后获取服务器返回的数据
          console.log('status:' + status);
          const tempRes = JSON.parse(response);
          if (tempRes.status === 200) {
            this.btnUploadIsDisabled = false;
            alert ('upload successfully!');
          } else {
            this.btnUploadIsDisabled = false;
            alert (tempRes.msg);
          }
        } else {
          // 上传文件后获取服务器返回的数据错误
          this.isSuccess = false;
          this.btnUploadIsDisabled = false;
          alert ('Network error, please retry!');
        }
      };

      this.uploader.queue[0].upload(); // 开始上传

      this.uploader.onCompleteItem = ( file, response, header) => {
        this.res = JSON.parse(response);
        const resdata = this.res.data;

        this.stockExchange = resdata.stockExchange;
        this.companyName = resdata.companyName;
        this.record = resdata.record;
        this.fromDate = resdata.fromDate;
        this.toDate = resdata.toDate;
      };
    }
  }



  selectFile() {
    document.getElementById('file').click();
  }

  fileDelete() {
    this.selectFileName = null;
  }
}
