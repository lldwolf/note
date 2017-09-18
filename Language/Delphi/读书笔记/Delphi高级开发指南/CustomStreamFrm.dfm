inherited FrmCustomStream: TFrmCustomStream
  Caption = #23450#21046#27969#31867
  PixelsPerInch = 96
  TextHeight = 12
  object GroupBox1: TGroupBox
    Left = 0
    Top = 0
    Width = 688
    Height = 67
    Align = alTop
    TabOrder = 0
    object BtnLoadPlain: TButton
      Left = 72
      Top = 24
      Width = 113
      Height = 25
      Caption = 'Load Plain'
      TabOrder = 0
      OnClick = BtnLoadPlainClick
    end
    object BtnSaveEncode: TButton
      Left = 208
      Top = 24
      Width = 113
      Height = 25
      Caption = 'Save Encode'
      TabOrder = 1
      OnClick = BtnSaveEncodeClick
    end
    object BtnLoadEncode: TButton
      Left = 344
      Top = 24
      Width = 113
      Height = 25
      Caption = 'Load Encode'
      TabOrder = 2
      OnClick = BtnLoadEncodeClick
    end
  end
  object Memo1: TMemo
    Left = 0
    Top = 67
    Width = 289
    Height = 386
    Align = alLeft
    TabOrder = 1
  end
  object Memo2: TMemo
    Left = 289
    Top = 67
    Width = 399
    Height = 386
    Align = alClient
    TabOrder = 2
  end
  object SaveDialog1: TSaveDialog
    Left = 120
    Top = 64
  end
  object OpenDialog1: TOpenDialog
    Left = 152
    Top = 64
  end
end
