//動態建立「連帶保證人＋住址」整組 HTML（第二筆起附帶刪除按鈕）
function appendGuPersonAddressRow($list) {
    const $row = $(`
        <div class="icPersonGroup loanGuRow mt-3 pt-2 border-top" data-types="6">
            <div class="form-group form-inline my-3">
                <span class="mr-2">連帶保證人：</span>
                <select class="form-control mr-2 icPerson">
                    <option value="">請選擇</option>
                </select>
                <input type="text" class="form-control col-3 icPersonName" value="" disabled>
                <button type="button" class="ml-2 btn btn-danger" onclick="delGuPersonAddressBtn(this)">×</button>
            </div>

            <div class="form-group form-inline my-2">
                <span class="mr-2">住址：</span>
                <input type="text" class="form-control col-9 icPersonAddress" disabled>
            </div>
        </div>
    `);
    $list.append($row);
}

//按鈕事件：新增連帶保證人與住址
function addGuPersonAddressBtn(obj) {
    const $list = $(obj).closest(".loanGuaranteePersonList");
    appendGuPersonAddressRow($list);
    // 觸發共用刷新，讓新加入的 .icPerson 下拉選單自動填入選項，選取後自動帶出姓名與住址
    icRefreshPageFields();
}

//按鈕事件：刪除連帶保證人與住址（整組移除）
function delGuPersonAddressBtn(obj) {
    $(obj).closest(".icPersonGroup").remove();
}

//4借據-回填（val 為下行的 data）
function icLoanReceiptFill($card, val) {
    const $list = $card.find(".loanGuaranteePersonList");

    // 1. 回填多位連帶保證人（相容陣列 ["ID1", "ID2"] 或單筆字串 "ID1"）
    // 後續 renderIndividualContract 執行 icRefreshPageFields() 時會自動帶出姓名與住址
    const idList = Array.isArray(val.id) ? val.id : (val.id ? [val.id] : []);
    idList.forEach(function (personId, idx) {
        if (idx > 0) {
            appendGuPersonAddressRow($list);
        }
        icSetPerson($card, personId, idx);
    });

    // 2. 回填借款金額（若有專案千分位函式則順便格式化）
    const $amountInput = $card.find(".loanAmount");
    $amountInput.val(val.amount || "");
    if (val.amount && typeof set_money_Thousands === "function") {
        set_money_Thousands($amountInput[0]);
    }

    // 3. 回填借款本息償還方法（智慧文字）與選擇利率型式
    $card.find(".loanTextbox").val(val.textbox || "");
    $card.find(".loanRate").val(val.rate || "");
}
