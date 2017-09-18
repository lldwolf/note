unit ReadWriteFrm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ModuleFrm, StdCtrls;

type
  TFrmReadWrite = class(TFrm)
    OpenDialog1: TOpenDialog;
    SaveDialog1: TSaveDialog;
    Memo1: TMemo;
    GroupBox1: TGroupBox;
    Button1: TButton;
    BtnReadRevLine: TButton;
    BtnWritesLines: TButton;
    BtnReadLines: TButton;
    Button5: TButton;
    procedure BtnWritesLinesClick(Sender: TObject);
    procedure BtnReadLinesClick(Sender: TObject);
    procedure Button5Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmReadWrite: TFrmReadWrite;

implementation

{$R *.dfm}

procedure TFrmReadWrite.BtnWritesLinesClick(Sender: TObject);
var
  Str1: TFileStream;
  Writer1: TWriter;
  i: Integer;
begin
  SaveDialog1.Filter := 'Read Write file(*.rwf)|*.rwf|Any file(*.*)|*.*';
  SaveDialog1.FilterIndex := 1;
  SaveDialog1.DefaultExt := 'rwf';
  if SaveDialog1.Execute then
  begin
    Str1 := TFileStream.Create(SaveDialog1.FileName, fmCreate or fmOpenWrite);
    Writer1 := TWriter.Create(Str1, 1024);
    try
      Writer1.WriteListBegin;
      for i := 0 to Memo1.Lines.Count - 1 do
        Writer1.WriteString(Memo1.Lines[i]);
      Writer1.WriteListEnd;
    finally
      Writer1.Free;
      Str1.Free;
    end;
  end;
end;

procedure TFrmReadWrite.BtnReadLinesClick(Sender: TObject);
var
  Str1: TFileStream;
  Reader1: TReader;
  i: Integer;
begin
  OpenDialog1.Filter := 'Read Write file(*.rwf)|*.rwf|Any file(*.*)|*.*';
  OpenDialog1.FilterIndex := 1;
  OpenDialog1.DefaultExt := 'rwf';
  if OpenDialog1.Execute then
  begin
    Str1 := TFileStream.Create(OpenDialog1.FileName, fmOpenRead);
    Reader1 := TReader.Create(Str1, 1024);
    try
      Reader1.ReadListBegin;
      Memo1.Lines.Clear;
      while not Reader1.EndOfList do
      begin
        Memo1.Lines.Add(Reader1.ReadString);
        Application.ProcessMessages;
      end;
      Reader1.ReadListEnd;
    finally
      Reader1.Free;
      Str1.Free;
    end;

    for i := 0 to ControlCount - 1 do
      if Controls[i] is TButton then
        TButton(Controls[i]).Enabled := True;
  end;
end;

procedure TFrmReadWrite.Button5Click(Sender: TObject);
var
  MemStr: TMemoryStream;
  Writer1: TWriter;
  Reader1: TReader;
  i: Integer;
begin
  MemStr := TMemoryStream.Create;
  try
    Writer1 := TWriter.Create(MemStr, 1024);
    Writer1.WriteListBegin;
    Randomize;
    while Memo1.Lines.Count > 0 do
    begin
      i := Random(Memo1.Lines.Count);
      Writer1.WriteString(Memo1.Lines[i]);
      Memo1.Lines.Delete(i);
      Application.ProcessMessages;
    end;
    Writer1.WriteListEnd;
    Writer1.Free;

    MemStr.Seek(0, soFromBeginning);
    Reader1 := TReader.Create(MemStr, 1024);
    try
      Reader1.ReadListBegin;
      while not Reader1.EndOfList do
      begin
        Memo1.Lines.Add(Reader1.ReadString);
        Application.ProcessMessages;
      end;
      Reader1.ReadListEnd;
    finally
      Reader1.Free;
    end;
  finally
    MemStr.Free;
  end;
end;

end.
