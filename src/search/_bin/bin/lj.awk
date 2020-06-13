#
# One line paragraphs are sent here so we can check if we want
# to keep them or not. Many one-liners can be repeated and we don't
# need to index those, over and over.
#
# return 1 if we want to discard the paragraph
#
function discardParagraph(p) {
  if (n = match(p,/^[Aa]men/) > 0) {
    return 1
  }

  if (n = match(p,/[Tt]eraz zaczynamy/) > 0) {
    return 1
  }

  return 0
}

BEGIN {
  i = 0
  p = 0
  o = -1
  l = -1
  fm = 0
  omit = 0
  capture = 0
  needComma = "n"

  printf "{\n  \"source\": \"%s\",\n  \"book\": \"%s\",\n  \"unit\": \"%s\",\n", source, book, unit
  printf "  \"paragraph\": [\n"
  # printf "+start pid: %s\n", p
}
# front matter indicator, front matter is not part of the document
/---/ {
  if (fm == 0) {
    fm = 1
    # printf "+fm start pid: %s\n", p
  }
  else if (fm == 1) {
    fm = 2
    # printf "+fm end pid: %s\n", p
  }
  next
}
# a markdown class designation
/^{:/ {
  # printf "+omit pid: %s, %s\n", p, $0
  omit = 1
  next
}
# html comment
/<!--/ {
  next
}
/\[\^.*\]:/ {
  # printf "+footnote def pid: %s, %s\n", p, $0
  next
}
# header
$1 ~ /##/ {
  # printf "+header pid: %s, %s\n", p, $0
  next
}
# <div data-index="1"> indicate paragraphs that are indexed, not everything is indexed
$2 ~ /data-index/ {
  # printf "+capture start pid: %s, %s\n", p, $0
  capture = 1
  next
}
/^<div/ {
  # printf "+open div pid: %s, %s\n", p, $0
  next
}
# toggle capture off whenever we see a </div>
/<\/div>/ {
  # printf "+close div pid: %s, %s\n", p, $0
  capture = 0
  next
}
/^$/ || /^>$/ || /^>\s*$/ {
  # discard paragraphs when omit is true
  if (omit == 1) {
    # printf "+omit pid: %s, %s\n", p, nclines[0]
    p++
    l = -1
    o = -1
    text = ""
    delete lines
    delete nclines
    omit = 0
    next
  }

  if (l > -1) {
    len = length(lines)
    discard = 0
    if (len == 1) {
      discard = discardParagraph(lines[0])
    }
    printf "  %s{\n", needComma == "y" ? "," : ""
    printf "    \"discard\": %u,\n", discard
    printf "    \"pid\": %s,\n", p
    for (line in lines) {
      raw = lines[line]
      gsub(/\&hellip;/, "", raw)
      # remove <br/> 
      gsub(/<br\/>/,"",raw)
      # remove <br> 
      gsub(/<br>/,"",raw)
      # remove <p></p> 
      gsub(/<\/?p[^>]*>/,"",raw)
      # remove <span></span> 
      gsub(/<\/?span[^>]*>/,"",raw)
      # remove punctuation
      gsub(/[\[\])(*>.,!?;:’'"“”–„/\\]/,"",raw)
      #remove 0xa0
      gsub(/ /,"",raw)
      # convert dash to space 
      gsub(/[-—]/," ",raw)
      text = sprintf("%s %s", text, raw)
    }
    # remove leading space
    gsub(/^ */, "", text)
    # collapse two spaces into one
    gsub(/  */," ",text)
    # remove underscores - text bracketed by __xxx__ are bolded by markdown
    gsub(/__/,"",text)
    printf "    \"text\": \"%s\"\n  }\n", tolower(text)
    l = -1
    text = ""
    delete lines
    needComma = "y"
    p++
  }
  else if (o > -1) {
    # printf "+emit non capture pid: %s, %s\n", p, nclines[0]
    p++
    delete nclines
    o = -1
  }
  next
}
{
  # keep track of both omitted and captured paragraphs since
  # we need to increment the p counter for both
  if (capture == 1) {
    l++
    lines[l] = $0
  }
  else if (fm == 2) {
    o++
    nclines[o] = $0
  }
}
END {
  printf "]}\n"
}

