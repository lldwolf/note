unit InterfaceUnit;

interface

uses Windows;

{$IFNDEF CHAPTER9}
function AddTwoNum(const Num1, Num2: Word): Word; stdcall;
procedure ShowModuleForm(AHandle: THandle); stdcall;
{$ENDIF}

implementation

{$IFNDEF CHAPTER9}
function AddTwoNum; external 'Chapter9.dll' name 'AddTwoNum';
procedure ShowModuleForm; external 'Chapter9.dll' name 'ShowModuleForm';
{$ENDIF}

end.
