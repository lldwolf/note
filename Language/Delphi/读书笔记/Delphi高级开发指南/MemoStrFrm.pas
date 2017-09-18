unit MemoStrFrm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ModuleFrm, StdCtrls;

type
  TFrmMemoStr = class(TFrm)
    Memo1: TMemo;
    Button1: TButton;
    Button2: TButton;
    Button3: TButton;
    OpenDialog1: TOpenDialog;
    SaveDialog1: TSaveDialog;
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmMemoStr: TFrmMemoStr;

implementation

{$R *.dfm}

procedure TFrmMemoStr.Button1Click(Sender: TObject);
var
  MyStream: TFileStream;
begin
  if OpenDialog1.Execute then
  begin
    MyStream := TFileStream.Create(OpenDialog1.FileName, fmOpenRead);
    try
      Memo1.Lines.LoadFromStream(MyStream);
    finally
      MyStream.Free;
    end;
  end;
end;

procedure TFrmMemoStr.Button2Click(Sender: TObject);
var
  MyStream: TFileStream;
begin
  if SaveDialog1.Execute then
  begin
    if FileExists(SaveDialog1.FileName) then
      MyStream := TFileStream.Create(SaveDialog1.FileName, fmOpenWrite)
    else
      MyStream := TFileStream.Create(SaveDialog1.FileName, fmOpenWrite or fmCreate);

    try
      Memo1.Lines.SaveToStream(MyStream);
    finally
      MyStream.Free;
    end;
  end;
end;

procedure TFrmMemoStr.Button3Click(Sender: TObject);
var
  Stream1, Stream2: TFileStream;
begin
  if OpenDialog1.Execute and SaveDialog1.Execute then
  begin
    Stream1 := TFileStream.Create(OpenDialog1.FileName, fmOpenRead);
    try
      Stream2 := TFileStream.Create(SaveDialog1.FileName, fmOpenWrite or fmCreate);
      try
        Stream2.CopyFrom(Stream1, Stream1.Size)
      finally
        Stream2.Free;
      end;
    finally
      Stream1.Free;
    end;
  end;
end;

end.
