function toggleAbstractEditor()
{
    abstractEditorTag = document.getElementById('abstractEditor');

    if (abstractEditorTag.style.visibility == "hidden")
    {
        abstractEditorTag.style.visibility = "visible";
        abstractEditorTag.style.display = "block";
    }
    else
    {
        abstractEditorTag.style.visibility = "hidden";
        abstractEditorTag.style.display = "none";
    }
}

