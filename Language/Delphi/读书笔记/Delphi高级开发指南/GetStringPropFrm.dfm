inherited FrmGetStringProp: TFrmGetStringProp
  Left = 305
  Top = 166
  Caption = 'FrmGetStringProp'
  ClientHeight = 256
  ClientWidth = 337
  PixelsPerInch = 96
  TextHeight = 12
  object Label1: TLabel
    Left = 32
    Top = 24
    Width = 60
    Height = 12
    Caption = #23383#31526#20018#23646#24615
  end
  object LblResult: TLabel
    Left = 128
    Top = 80
    Width = 54
    Height = 12
    Caption = 'LblResult'
  end
  object Label3: TLabel
    Left = 128
    Top = 112
    Width = 54
    Height = 12
    Caption = 'New Value'
  end
  object EdtProp: TEdit
    Left = 96
    Top = 20
    Width = 121
    Height = 20
    TabOrder = 0
  end
  object BtnGet: TButton
    Left = 40
    Top = 72
    Width = 75
    Height = 25
    Caption = 'Get Value'
    TabOrder = 1
    OnClick = BtnGetClick
  end
  object BtnSet: TButton
    Left = 40
    Top = 104
    Width = 75
    Height = 25
    Caption = 'Set Value'
    TabOrder = 2
    OnClick = BtnSetClick
  end
  object EdtNew: TEdit
    Left = 192
    Top = 108
    Width = 121
    Height = 20
    TabOrder = 3
  end
  object BtnTrial: TButton
    Left = 112
    Top = 200
    Width = 105
    Height = 25
    Caption = 'Trial Button'
    TabOrder = 4
  end
end
