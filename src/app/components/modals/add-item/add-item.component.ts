import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarcodeFormat } from '@zxing/library';
import { AuthenticatorService } from 'src/app/services/authenticator.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public form: FormGroup,
    private snackBar: MatSnackBar,
    public authenticator: AuthenticatorService
  ) { }

  scannerTurnedOn = false;
  torchEnabled = false;
  tryHarder = false;
  currentDevice: MediaDeviceInfo = null;
  formats = [BarcodeFormat.EAN_13];
  availableDevices: MediaDeviceInfo[];
  hasPermission: boolean = null;

  ngOnInit(): void { }

  onPermissionResponse(permission: boolean) {
    this.hasPermission = permission;
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
  }

  onScanSuccess(data: string) {
    this.scannerTurnedOn = false;
    this.form.controls['ean'].setValue(data)
  }

  toggleCamera() {
    this.scannerTurnedOn = !this.scannerTurnedOn
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['my-snack-bar']
    });
  }

  openSnackBarAlert(message) {
    this.snackBar.open(message, 'OK', {
      duration: 10000,
      panelClass: ['my-snack-bar-alert']
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
