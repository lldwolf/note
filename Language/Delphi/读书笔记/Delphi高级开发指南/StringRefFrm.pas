unit StringRefFrm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls;

type
  TFrmStringRef = class(TForm)
    Button1: TButton;
    Button2: TButton;
    Button3: TButton;
    Button4: TButton;
    Button5: TButton;
    Label1: TLabel;
    ListBox1: TListBox;
    Button6: TButton;
    Button7: TButton;
    Button8: TButton;
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure Button5Click(Sender: TObject);
    procedure Button7Click(Sender: TObject);
    procedure Button8Click(Sender: TObject);
  private
    Test, S2, S3: string;
    function GetRefCount(const s: string): Integer;
    function GetSize(const s: string): Integer;
    procedure UpdateInfo;
  public
    { Public declarations }
  end;

var
  FrmStringRef: TFrmStringRef;

implementation

{$R *.dfm}

{ TFrm }

function TFrmStringRef.GetRefCount(const s: string): Integer;
var
  RefCountPointer: Pointer;
begin
  if Pointer(s) <> nil then
  begin
    //减8位用于引用计数,减4位用于检索长度
    RefCountPointer := Pointer(Integer(Pointer(s)) - 8);
    Result := Integer(RefCountPointer^);
  end else
    Result := 0;
end;

function TFrmStringRef.GetSize(const s: string): Integer;
var
  SizePointer: Pointer;
begin
  if Pointer(s) <> nil then
  begin
    SizePointer := Pointer(Integer(Pointer(s)) - 4);
    Result := Integer(SizePointer^);
  end else
    Result := 0;
end;

procedure TFrmStringRef.UpdateInfo;
begin
  with Listbox1.Items do
  begin
    Clear;
    Add('字符串:' + Test);
    Add('Pascal格式字符串长度:' + IntToStr(Length(Test)));
    Add('PChar格式字符串长度:' + IntToStr(StrLen(PChar(Test))));
    Add(Format('地址:%p', [Pointer(Test)]));
    Add('Size Info:' + IntToStr(GetSize(Test)));
    Add('引用计数:' + IntToStr(GetRefCount(Test)));
  end;
end;

procedure TFrmStringRef.Button1Click(Sender: TObject);
begin
  SetLength(Test, 100);
  GetWindowText(Handle, PChar(Test), 100);
  UpdateInfo;
end;

procedure TFrmStringRef.Button2Click(Sender: TObject);
begin
  S2 := Test;
  UpdateInfo;
end;

procedure TFrmStringRef.Button3Click(Sender: TObject);
begin
  S3 := Test;
  UpdateInfo;
end;

procedure TFrmStringRef.Button4Click(Sender: TObject);
begin
  S2 := S2 + '*';
  UpdateInfo;
end;

procedure TFrmStringRef.Button5Click(Sender: TObject);
begin
  Test := Test + '*';
  UpdateInfo;
end;

procedure TFrmStringRef.Button7Click(Sender: TObject);
begin
  Test := PChar(Test);
  UpdateInfo;
end;

procedure TFrmStringRef.Button8Click(Sender: TObject);
begin
  SetLength(Test, StrLen(PChar(Test)));
  UpdateInfo;
end;

end.
