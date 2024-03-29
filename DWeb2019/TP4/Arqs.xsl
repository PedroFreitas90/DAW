<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-16"/>
    
    <xsl:template match="/">
        <xsl:result-document href="dataset/index.html">
            <html>
                <head>
                    <title>Arquivo de Arqueossítios do Nordeste Português </title>
                    <meta charset="UTF-16"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <h1>Arqueossítios do Nordeste Português</h1>
                    <hr/>
                    <h3>Indíce de Arqueossítios por Concelhos</h3>
                    <ul>
                        <xsl:apply-templates select="//ARQELEM[not(preceding::CONCEL=./CONCEL)]" mode="indice">
                            <xsl:sort select="normalize-space(CONCEL)"></xsl:sort>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>


    <xsl:template match="ARQELEM" mode="indice">
        <xsl:variable name="c" select="CONCEL"/>
        <li>
            <xsl:value-of select="CONCEL"/>
            <ol>
                <xsl:apply-templates select="//IDENTI[../CONCEL=$c]">
                    <xsl:sort select="."/>
                </xsl:apply-templates>
            </ol>    
        </li>
    </xsl:template>

    <xsl:template match="IDENTI">
        <li>
            <a name="{../count(preceding-sibling::*)+1}"/>
            <a href="{../count(preceding-sibling::*)+1}"><xsl:value-of select="."/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="text()" priority="-1"></xsl:template>
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="dataset/arq{count(preceding-sibling::*)+1}.xml">
            <xsl:processing-instruction name="xml-stylesheet" >type="text/xsl" href="arq2html.xsl"</xsl:processing-instruction>
            <xsl:copy-of select="."/>
        </xsl:result-document>
    </xsl:template>

</xsl:stylesheet>