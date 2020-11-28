// Tabela A – Y dados provenientes do spat

// Z – Produto_LERAbreviado
// Coluna 	L(Produto) – primeiros 8 chars
function Produto_LERAbreviado(L2){
    L2.substring(0, 8);
}


// AA – Produto_Grupo
// Coluna 	L(Produto) – primeiros 2 chars
function Produto_Grupo(L2){
    L2.substring(0, 2);
}


// AB – Produto_GrupoEespecifico
// Coluna 	L(Produto) – primeiros 2 chars
function Produto_GrupoEespecifico(J2, R2){
    if(J2 === "C"){
        return "VLOOKUP(L2,'III. Motor'!$D$2:$J$628,4,FALSE)"
    }else{
        if(J2 === "D" && R2 !== 1){
        return "VLOOKUP(L2,'III. Motor'!$D$2:$J$628,4,FALSE)";
        }else{
            var d = "VLOOKUP(L2,'III. Motor'!$D$2:$J$628,4,FALSE)";
            if(d.isInteger(123)){
                return "Refugo Interno";
            }else{
                if(J2 === "D" && R2 === 1){
                    return "VLOOKUP(L2,'III. Motor'!$D$2:$J$628,4,FALSE)";
                }else{
                    return "Sem Grupo";
                }
            }
        }
    }
}


// AC – Produto_Frupo_Geral
// Coluna 	L(Produto) – primeiros 2 chars
function Produto_Frupo_Geral() {
    return "=VLOOKUP(K2,'III. Motor'!$W$2:$X$628,2,FALSE)";
}

// AD – Origem_DEsignação
// Coluna 	L(Produto) – primeiros 2 chars
function Origem_DEsignação() {
    return "=VLOOKUP(K2,'III. Motor'!$W$2:$X$628,2,FALSE)";
}

// AE – DestinoReal_designação
// Coluna 	L(Produto) – primeiros 2 chars
function DestinoReal_designação() {
    return "=VLOOKUP(R2,'III. Motor'!$S$2:$V$628,2,FALSE)";
}

// AF – DestinoReal_Grupo
// Coluna 	L(Produto) – primeiros 2 chars
function DestinoReal_Grupo() {
    return "=VLOOKUP(R2,'III. Motor'!$S$2:$V$628,3,FALSE)";
}

// AG – DestinoReal_Operação
// Coluna 	L(Produto) – primeiros 2 chars
function DestinoReal_Operação() {
    return "=VLOOKUP(J2,'III. Motor'!$Y$2:$Z$628,2,FALSE)";
}

// AH – DestinoReal_OperaçãoEspecifica
// Coluna 	L(Produto) – primeiros 2 chars
function DestinoReal_OperaçãoEspecifica() {
    return "VLOOKUP(R2,'III. Motor'!$S$2:$V$628,4,FALSE)";
}
// AI – designação_Resíduo Urbano
// Coluna 	L(Produto) – primeiros 2 chars
function designação_Resíduo(X2, AA2) {
    if((X2 === 1 || X2 === 3) && (AA2 === "15" || AA2 === "20")){
        return "Resíduo Urbano";
    }else{
        return "Resíduo Não Urbano";
    }
}

// AJ – Produto_GrupoEspecifico++
//igaual ao AB

// AK – Produto_GrupoEspecifico++

//igaual ao AB

// function Produto_GrupoEespecifico(J2, R2){
//     if(J2 === "C"){
//         return "VLOOKUP(L2,'III. Motor'!$D$2:$J$628,4,FALSE)"
//     }else{
//         if(J2 === "D" && R2 !== 1){
//             return "VLOOKUP(L2,'III. Motor'!$D$2:$J$628,4,FALSE)";
//         }else{
//             var d = "VLOOKUP(L2,'III. Motor'!$D$2:$J$628,4,FALSE)";
//             if(d.isInteger(123)){
//                 return "Refugo Interno";
//             }else{
//                 if(J2 === "D" && R2 === 1){
//                     return "VLOOKUP(L2,'III. Motor'!$D$2:$J$628,4,FALSE)";
//                 }else{
//                     return "Sem Grupo";
//                 }
//             }
//         }
//     }
// }

// AL – Massa_MegaGramas
// Coluna 	L(Produto) – primeiros 2 chars
function Massa_MegaGramas(P2) {
    var n = P2/1000;
    return n;
}

// AM – Data_Ano
// Coluna 	L(Produto) – primeiros 2 chars
function Data_Ano(D2) {
    var n = D2.getYear()
    return n;
}

// AN – Data_mês
// Coluna 	L(Produto) – primeiros 2 chars
function Data_mês(D2) {
    var n = D2.getMonth()
    return n;
}

// AO – Data_NúmeroSemana
// Coluna 	L(Produto) – primeiros 2 chars
// function Data_NúmeroSemana(D2) {
//     var D2 = new Date();
//     var n = d.getMonth()
//     return n;
// }

// AP – Data_DiaSemana
// Coluna 	L(Produto) – primeiros 2 chars
function Data_DiaSemana(D2) {
    var n = D2.getDay()
    return n;
}

// AQ – Data_Hora
// Coluna 	L(Produto) – primeiros 2 chars
function Data_Hora(D2) {
    return "VLOOKUP(I2,'III. Motor'!$P$2:$R$628,2,FALSE)";
}

// AR – ZonaEntidade_Designação
// Coluna 	L(Produto) – primeiros 2 chars
function ZonaEntidade_Designação() {
    return "VLOOKUP(I2,'III. Motor'!$P$2:$R$628,2,FALSE)";
}

// AS – ZonaEntidade_Grupo
// Coluna 	L(Produto) – primeiros 2 chars
function ZonaEntidade_Grupo() {
    return "VLOOKUP(I2,'III. Motor'!$P$2:$R$628,3,FALSE)";
}

// AT – TipoCliente_Designação
// Coluna 	L(Produto) – primeiros 2 chars
function TipoCliente_Designação() {
        return "VLOOKUP(X2,'III. Motor'!$N$2:$O$628,2,FALSE)";
}

// AU – RecolhaMunicipal_Chave
// Coluna 	L(Produto) – primeiros 2 chars
function RecolhaMunicipal_Chave() {
    if("VLOOKUP(G2,'III. Motor'!$AH$2:$AI$552,2,FALSE)"){
        return "Recolha não municipal";
    }else{
        return "VLOOKUP(G2,'III. Motor'!$AH$2:$AI$552,2,FALSE)";
    }
}

// AV – Entidade_SRIR
// Coluna 	L(Produto) – primeiros 2 chars
function Entidade_SRIR(X2, Zona_entidade, entidade) {
    if(X2 === 3 && Zona_entidade > 0 && Zona_entidade > 6){
        return "VLOOKUP(I2,'III. Motor'!$P$2:$AG$628,18,FALSE)";
    }else{
        return entidade;
    }
}

// BB – Data_DiaMês
// Coluna 	L(Produto) – primeiros 2 chars
function Data_DiaMês(D5) {
    return D5.getDay();
}

// BC – Destino_Valorização
// Coluna 	L(Produto) – primeiros 2 chars
function Destino_Valorização() {
    return "=VLOOKUP(R5,'III. Motor'!$S$2:$AE$628,13,FALSE)";
}

// BD – Produto_Valorizáveis
// Coluna 	L(Produto) – primeiros 2 chars
function Produto_Valorizáveis(J5,R5) {
    if(J5 === "C"){
        return "Expedição";
    }else{
        if(J5 === "D" && R5 !== 1){
            return "VLOOKUP(L5,'III. Motor'!$D$2:$J$628,4,FALSE";

        }else{
            return "Não valorizável";
        }
    }
}

// BO – Data_NúmeroSemanaNoAno
// Coluna 	L(Produto) – primeiros 2 chars
Date.prototype.getWeekNumber = function() {
    var oneJan =
        new Date(this.getFullYear(), 0, 1);
    var numberOfDays =
        Math.floor((this - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((this.getDay() + 1 + numberOfDays) / 7);
};
function Data_NúmeroSemanaNoAno(date) {
    return date.getWeekNumber();
}


// BP – Circuito_Código
// Coluna 	L(Produto) – primeiros 2 chars
function Circuito_Código(Y2){
    if(Y2.isEmpty()){
        return "Sem circuito selecionado";
    }else{
        return Y2;
    }
}

// BQ – Circuito_Designação
// Coluna 	L(Produto) – primeiros 2 chars
function Circuito_Designação(Y2, L2){
    if(Y2.isEmpty()){
        return "Sem circuito definido";
    }else{
        return L2;
    }
}

// BR – Circuito_Zonas
// Coluna 	L(Produto) – primeiros 2 chars
function Circuito_Zonas(Y2){
    if(Y2.isEmpty()){
        return "Sem circuito selecionado";
    }else{
        return "VLOOKUP(Y2,'III. Motor'!$H$2:$AF$628, 3,FALSE)";
    }
}

// BS – Circuito_Periodo
// Coluna 	L(Produto) – primeiros 2 chars
function Circuito_Periodo(Y2){
    if(Y2.isEmpty()){
        return "Sem circuito selecionado";
    }else{
        return "VLOOKUP(Y2,'III. Motor'!$H$2:$AF$628, 25,FALSE)";
    }
}


// BU – Designação_transportador
// Coluna 	L(Produto) – primeiros 2 chars
function Designação_transportador(){
    if("VLOOKUP(W2,'III. Motor'!$AM$2:$AN$628,2,FALSE"){
        return "Não aplicável";
    }else{
        return "VLOOKUP(W2,'III. Motor'!$AM$2:$AN$628,2,FALSE)"
    }
}

// BV – Nome_SRIR
// Coluna 	L(Produto) – primeiros 2 chars
function Nome_SRIR(){
    return '=VLOOKUP([@[Entidade_SRIR]], Tabela4[#All], 3, FALSE)';
}

// BW – NIF_SRIR
// Coluna 	L(Produto) – primeiros 2 chars
function NIF_SRIR(){
    return '=VLOOKUP([@[Entidade_SRIR]], Tabela4[#All], 3, FALSE)';
}

// BX – Origem_SRIR
// Coluna 	L(Produto) – primeiros 2 chars
function Origem_SRIR(){
    return '=VLOOKUP([@[Entidade_SRIR]],Tabela4[#All],8,FALSE)';
}

// BY – TipoCliente_Conformidade
// Coluna 	L(Produto) – primeiros 2 chars
// VLOOKUP(
//     [@Entidade],
//     Tabela4[#All],
//     7,
//     FALSE
// ),
function TipoCliente_Conformidade(TipoCliente_Designação , Entidade){
    if(TipoCliente_Designação == Entidade){
        return "Válido";
    }else{
        return "Suspeito";
    }
}


// CB – categoria_ETRS
// Coluna 	L(Produto) – primeiros 2 chars
function categoria_ETRS(J2, C2, R2, L2){
    if(J2 === "C" || C2 === "GT"){
        return "Não aplicável";
    }else{
        if(L2.substr(10, 2)==="CT"){
            return "Não aplicável";
        }else{
            if(R2  === 1 || R2 === 11){
                return "'III. Motor'!$D$2:$AR$628,";
            }else{
                if(R2 === 2 || R2 === 3 || R2 === 4 || R2 === 5 || R2 === 6 || R2 === 15 ){
                    return "'III. Motor'!$D$2:$AR$628,";
                }else{
                    return "Não aplicável";
                }
            }
        }
    }
}








