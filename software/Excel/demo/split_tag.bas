Attribute VB_Name = "split_tag"
Option Explicit
Private LogSheet As Excel.Worksheet
Private LogRow As Integer

Public Sub split_tag()

    Dim op_sheet As Excel.Worksheet
    
    Set op_sheet = Sheet18
    Set LogSheet = Sheet1
    LogRow = 2
    
    Dim col_tag As Excel.Range
    Dim r_find As Excel.Range
    Dim begin_row As Integer
    
    Set col_tag = op_sheet.Columns(3)
    
    'A/B格式的后缀
    Set r_find = col_tag.Find("A/")
    
    While Not r_find Is Nothing
        Call splic_tag1(r_find)
        Set col_tag = op_sheet.Columns(3)
        Set r_find = col_tag.Find("A/", r_find)
    Wend
    
    'A-H格式的后缀
    Set r_find = col_tag.Find("A-")
    
    While Not r_find Is Nothing
        Call splic_tag2(r_find)
        Set col_tag = op_sheet.Columns(3)
        Set r_find = col_tag.Find("A-", r_find)
    Wend

End Sub

'拆分A/B格式的后缀
Private Sub splic_tag1(r_tag As Excel.Range)

    Dim op_sheet As Excel.Worksheet
    Dim p As Integer
    Dim sTag As String
    Dim arrTag() As String

    Set op_sheet = r_tag.Worksheet
    sTag = r_tag.Text
    
    LogSheet.Cells(LogRow, 1) = sTag
    
    arrTag = Split(sTag, "/")
    
    Dim I As Integer
    Dim base_tag As String
    Dim obj_tag As String
    
    base_tag = Left(arrTag(0), Len(arrTag(0)) - 1)
    r_tag.Value2 = arrTag(0)
    obj_tag = arrTag(0)
    
    For I = LBound(arrTag) + 1 To UBound(arrTag)
        arrTag(I) = base_tag & arrTag(I)
        obj_tag = obj_tag & ", " & arrTag(I)
        
        '复制行
        Call op_sheet.Rows(r_tag.Row).Copy
        op_sheet.Rows(r_tag.Row + I).Insert Shift:=xlDown
        op_sheet.Cells(r_tag.Row + I, r_tag.Column) = arrTag(I)
        Application.CutCopyMode = False
    Next I
    
    LogSheet.Cells(LogRow, 2) = obj_tag
    
    LogRow = LogRow + 1
    
    
End Sub


'拆分A-H格式的后缀
Private Sub splic_tag2(r_tag As Excel.Range)

    Dim op_sheet As Excel.Worksheet
    Dim p As Integer
    Dim sTag As String
    Dim sLast As String
    Dim sFirst As String

    Set op_sheet = r_tag.Worksheet
    sTag = Trim(r_tag.Text)
    
    LogSheet.Cells(LogRow, 1) = sTag
    
    sLast = Right(sTag, 1)
    sFirst = Mid(sTag, Len(sTag) - 2, 1)
    
    
    Dim I As Integer
    Dim base_tag As String
    Dim obj_tag As String
    
    base_tag = Left(sTag, Len(sTag) - 3)
    r_tag.Value2 = base_tag & sFirst
    obj_tag = base_tag & sFirst
    
    For I = Asc(sFirst) + 1 To Asc(sLast)
        obj_tag = obj_tag & ", " & base_tag & Chr(I)
        
        '复制行
        Call op_sheet.Rows(r_tag.Row).Copy
        op_sheet.Rows(r_tag.Row + I - Asc(sFirst)).Insert Shift:=xlDown
        op_sheet.Cells(r_tag.Row + I - Asc(sFirst), r_tag.Column) = base_tag & Chr(I)
        Application.CutCopyMode = False
    Next I
    
    LogSheet.Cells(LogRow, 2) = obj_tag
    
    LogRow = LogRow + 1
    
    
End Sub


