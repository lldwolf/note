inherited FrmSetTitle: TFrmSetTitle
  Caption = 'FrmSetTitle'
  ClientHeight = 328
  ClientWidth = 413
  PixelsPerInch = 96
  TextHeight = 12
  object Label1: TLabel
    Left = 56
    Top = 120
    Width = 36
    Height = 12
    Caption = 'Label1'
    OnClick = AnyClick1
  end
  object CheckBox1: TCheckBox
    Left = 56
    Top = 80
    Width = 177
    Height = 17
    Caption = 'CheckBox1'
    TabOrder = 0
    OnClick = AnyClick1
  end
  object Button1: TButton
    Left = 56
    Top = 32
    Width = 177
    Height = 25
    Caption = 'Button1'
    TabOrder = 1
    OnClick = AnyClick1
  end
  object Edit1: TEdit
    Left = 56
    Top = 152
    Width = 121
    Height = 20
    TabOrder = 2
    Text = 'Edit1'
    OnClick = AnyClick1
  end
  object GroupBox1: TGroupBox
    Left = 56
    Top = 192
    Width = 297
    Height = 105
    Caption = 'GroupBox1'
    TabOrder = 3
    OnClick = AnyClick2
    object RadioButton1: TRadioButton
      Left = 24
      Top = 32
      Width = 113
      Height = 17
      Caption = 'RadioButton1'
      TabOrder = 0
      OnClick = AnyClick2
    end
    object RadioButton2: TRadioButton
      Left = 24
      Top = 64
      Width = 113
      Height = 17
      Caption = 'RadioButton2'
      TabOrder = 1
      OnClick = AnyClick2
    end
  end
end
