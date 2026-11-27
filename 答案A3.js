
//4借據-暫存取值（S060001037 的 data）
function icLoanReceiptCollect($card) {
    const idList = [];
    $card.find(".loanGuaranteePersonList .icPersonGroup").each(function (idx) {
        const personId = icGetPerson($card, idx);
        if (personId) {
            idList.push(personId);
        }
    });

    return {
        "amount": $card.find(".loanAmount").val() || "",
        "textbox": $card.find(".loanTextbox").val() || "",
        "rate": $card.find(".loanRate").val() || "",
        "id": idList
    };
}
