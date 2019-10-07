<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-16"/>
    
    <xsl:template match="/">
        <xsl:result-document href="Website/index.html">
            <html>
                <head>
                    <title>Arquivo de Arqueosítios do Nordeste Português </title>
                    <meta charset="UTF-16"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <h1>Arqueosítios do Nordeste Português</h1>
                    <hr/>
                    <h3>Indíce de Arqueosítios</h3>
                    <ol>
                        <xsl:apply-templates mode="indice"/>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>


    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="{generate-id()}"/>
            <a href="arqueossitio-{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match ="ARQELEM">
        <xsl:result-document href="Website/arqueossitio-{generate-id()}.html"> 
            
            <html>
                <head>
                    <title>Arquivo de Arqueossítios do Nordeste</title>
                    <meta charset="UFT8"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                
                     
                <body>
                    
                    <table class="w3-table">
                        <tr>
                            <th>TIPO</th>
                            <td><xsl:value-of select="TIPO/@ASSUNTO"/></td>
                        </tr>
                        
                        <xsl:choose>
                        <xsl:when test="IMAGEM/@NOME">
                        <tr>
                            <th>IMAGEM</th>
                            <td>
                                <img src="{IMAGEM/@NOME}"> 
                                    <xsl:value-of select="IMAGEM/@NOME"/>
                                </img>
                            </td>
                        </tr>
                        </xsl:when>
                        </xsl:choose>
                        
                        <tr>
                            <th>Descricao</th>
                            <td><xsl:value-of select="DESCRI"/></td>
                        </tr>
                        
                        <xsl:choose>
                        <xsl:when test="CRONO">
                        <tr>
                            <th>Cronologia</th>
                            <td><xsl:value-of select="CRONO"/></td>
                        </tr>
                        </xsl:when>
                        </xsl:choose>
                        
                        <tr>
                            <th>Lugar</th>
                            <td><xsl:value-of select="LUGAR"/></td>
                        </tr>
                        
                        <tr>
                            <th>Freguesia</th>
                            <td><xsl:value-of select="FREGUE"/></td>
                        </tr>
                       
                        <tr>
                            <th>Concelho</th>
                            <td><xsl:value-of select="CONCEL"/></td>
                        </tr>
                        
                        <xsl:choose>
                        <xsl:when test="CODADM">
                        <tr>
                            <th>Codadm</th>
                            <td><xsl:value-of select="CODADM"/></td>
                        </tr> 
                        </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose>
                        <xsl:when test="LATITU">
                        <tr>
                            <th>Latitude</th>
                            <td><xsl:value-of select="LATITU"/></td>
                        </tr>
                        </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose>
                            <xsl:when test="LONGIT">
                                <tr>
                                    <th>Longitude</th><td><xsl:value-of select="LONGIT"/></td>
                                </tr>
                            </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose>
                        <xsl:when test="ALTITU">
                        <tr>
                            <th>Altitude</th>
                            <td><xsl:value-of select="ALTITU"/></td>
                        </tr>
                        </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose>
                        <xsl:when test="ACESSO">
                        <tr>
                            <th>Acesso</th>
                            <td><xsl:value-of select="ACESSO"/></td>
                        </tr>
                        </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose>
                        <xsl:when test="QUADRO">
                        <tr>
                            <th>Quadro</th>
                            <td><xsl:value-of select="QUADRO"/></td>
                        </tr>
                        </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose>
                        <xsl:when test="TRAARQ">
                        <tr>
                            <th>Traarq</th>
                            <td><xsl:value-of select="TRAARQ"/></td>
                        </tr>
                        </xsl:when>
                        </xsl:choose>
                        
                        <tr>
                            <th>Desarq</th>
                            <td><xsl:value-of select="DESARQ"/></td>
                        </tr>
                        
                        <xsl:choose>
                        <xsl:when test="INTERP">
                        <tr>
                            <th>Interp</th>
                            <td><xsl:value-of select="INTERP"/></td>
                        </tr>
                        </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose>
                        <xsl:when test="DEPOSI">
                        <tr>
                            <th>Deposito</th>
                            <td><xsl:value-of select="DEPOSI"/></td>
                        </tr>
                        </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose>
                        <xsl:when test="INTERE">
                        <tr>
                            <th>Intere</th>
                            <td><xsl:value-of select="INTERE"/></td>
                        </tr>
                        </xsl:when>
                        </xsl:choose>
        
                        <tr>
                            <th>Bibliografica</th>
                            <td><xsl:value-of select="BIBLIO"/></td>
                        </tr>
                        
                        <tr>
                            <th>Autor</th>
                            <td><xsl:value-of select="AUTOR"/></td>
                        </tr>
                        
                        <tr>
                        <th>Data</th>
                            <td><xsl:value-of select="DATA"/></td>
                        </tr>
                        
                    </table>
                    <hr/>
                    <address>
                        <a href="index.html#{generate-id()}">Voltar à página principal</a>
                    </address>
                    
                </body>
                
            </html>
  
        </xsl:result-document>
    
    </xsl:template>

</xsl:stylesheet>