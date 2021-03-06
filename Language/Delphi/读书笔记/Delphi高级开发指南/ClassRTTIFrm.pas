unit ClassRTTIFrm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ModuleFrm, StdCtrls, TypInfo;

type
  TFrmClassRTTI = class(TFrm)
    ListBox1: TListBox;
    ListBox2: TListBox;
    procedure FormCreate(Sender: TObject);
    procedure ListBox1Click(Sender: TObject);
  private
    procedure AddType(pti: PTypeInfo);
    procedure ShowClass(pti: PTypeInfo; sList: TStrings);
  public
    { Public declarations }
  end;

var
  FrmClassRTTI: TFrmClassRTTI;

implementation

{$R *.dfm}

{ TFrmOrdType }

procedure TFrmClassRTTI.AddType(pti: PTypeInfo);
begin
  ListBox1.Items.AddObject(pti^.Name, TObject(pti));
end;

procedure TFrmClassRTTI.FormCreate(Sender: TObject);
begin
  AddType(TypeInfo(TApplication));
  AddType(TypeInfo(TButton));
  AddType(TypeInfo(TEdit));
  AddType(TypeInfo(TLabel));
  AddType(TypeInfo(TCheckBox));
  AddType(TypeInfo(TComboBox));
  AddType(TypeInfo(TListBox));
end;

procedure TFrmClassRTTI.ListBox1Click(Sender: TObject);
var
  pti: PTypeInfo;
begin
  pti := PTypeInfo(ListBox1.Items.Objects[ListBox1.ItemIndex]);
  ListBox2.Items.Clear;
  ShowClass(pti, ListBox2.Items);
end;

procedure TFrmClassRTTI.ShowClass(pti: PTypeInfo; sList: TStrings);
var
  ptd: PTypeData;
  ParentClass: TClass;
  ppi: PPropInfo;
  pProps: PPropList;
  nProps, i: Integer;
begin
  if (pti^.Kind <> tkClass) then
    raise Exception.Create('�Ƿ����ͣ�');

  ptd := GetTypeData(pti);
  sList.Add('Type Name: ' + pti^.Name);

  //access the TTypeInfo structure
  sList.Add('Type Kind: ' + GetEnumName(TypeInfo(TTypeKind), Integer(pti^.Kind)));

  //access then TTypeData structure
  sList.Add('ClassType: ' + ptd^.ClassType.ClassName);
  sList.Add('Size: ' + IntToStr(ptd^.ClassType.InstanceSize) + ' bytes');
  sList.Add('Defined in: ' + ptd^.UnitName + '.pas');

  //add the list of parent classes
  ParentClass := ptd^.ClassType.ClassParent;
  if ParentClass <> nil then
  begin
    sList.Add('');
    sList.Add('==== Parent classes ====');
    while ParentClass <> nil do
    begin
      sList.Add(ParentClass.ClassName);
      ParentClass := ParentClass.ClassParent
    end;
  end;

  nProps := ptd^.PropCount;
  if nProps > 0 then
  begin
    sList.Add('');
    sList.Add('==== Properties (' + IntToStr(nProps) + ') ====');
    GetMem(pProps, sizeof(PPropInfo) * nProps);
    try
      //fill the TPropList structure
      //pointed to by pProps
      GetPropInfos(pti, pProps);
      //sort the properties
      SortPropList(pProps, nProps);
      //show name and data type of each property
      for i := 0 to nProps - 1 do
      begin
        ppi := pProps[i];
        sList.Add(ppi.Name + ': ' + ppi.PropType^.Name);
      end;
    finally
      FreeMem(pProps, sizeof(PPropInfo) * nProps);
    end;
  end;
end;


end.
