unit EnumRTTIFrm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ModuleFrm, StdCtrls, TypInfo;

type
  TFrmEnumRTTI = class(TFrm)
    ComboBox1: TComboBox;
    ListBox1: TListBox;
    procedure FormCreate(Sender: TObject);
    procedure ComboBox1Change(Sender: TObject);
  private
    SelPropName: string;
  public
    { Public declarations }
  end;

var
  FrmEnumRTTI: TFrmEnumRTTI;

implementation

{$R *.dfm}

procedure TFrmEnumRTTI.FormCreate(Sender: TObject);
var
  pProps: PPropList;
  nTotProps, nProps, i: Integer;
begin
  SelPropName := '';
  nTotProps := GetTypeData(ClassInfo).PropCount;
  GetMem(pProps, sizeof(PPropInfo) * nTotProps);
  try
    nProps := GetPropList(ClassInfo, [tkEnumeration], pProps);
    for i := 0 to nProps - 1 do
    begin
      ComboBox1.Items.Add(pProps[i].Name);
    end;
  finally
    FreeMem(pProps, sizeof(PPropInfo) * nTotProps);
  end;
end;

procedure TFrmEnumRTTI.ComboBox1Change(Sender: TObject);
var
  PropInfo: PPropInfo;
  ptd: PTypeData;
  i: Integer;
  PropValue: Integer;
begin
  if ComboBox1.Text <> '' then
    SelPropName := ComboBox1.Text;
  ListBox1.Items.Clear;
  PropInfo := GetPropInfo(ClassInfo, SelPropName);
  ptd := GetTypeData(PropInfo.PropType^);
  for i := ptd.MinValue to ptd.MaxValue do
    ListBox1.Items.Add(GetEnumName(PropInfo.PropType^, i));
  PropValue := GetOrdProp(self, PropInfo);
  ListBox1.ItemIndex := ptd.MinValue + PropValue;
end;

end.

