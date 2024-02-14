//=============================================================================
// PangI_MapCategorization.js
//=============================================================================

var Imported = Imported || {};
Imported.PangI_MapCategorization = true;

var PangI = PangI || {};
PangI.MapCate = PangI.MapCate || {};
PangI.MapCate.version = '1.0.0';

/*:
 * @plugindesc ver. 1.0.0 맵 유형화 플러그인 / The plugin that categorize maps
 * @author 팽이트위즈(PangI-Twise)
 * 
 * @param Type Numbers
 * @type Number
 * @min 0
 * @desc 맵에 할당할 속성의 수를 정합니다.
 * @default 5
 *
 * @help
 * =============================================================================
 * 개요
 * =============================================================================
 * 
 *  이 플러그인은 맵에 유형을 할당할 수 있도록 함으로써 맵들을 총괄적으로
 * 편리하게 분류할 수 있도록 지원합니다.
 *
 * =============================================================================
 * 노트 태그
 * =============================================================================
 *
 *  다음 노트 태그를 사용함으로써 맵에 유형을 지정할 수 있습니다.
 * 
 * 맵 노트 태그:
 * 
 *    <Map Type x Category: text>
 *    x번 속성에 대하여 해당 맵의 유형을 'text'로 설정합니다.
 * 
 * =============================================================================
 * 함수
 * =============================================================================
 * 
 *  다음 함수를 사용함으로써 맵에 지정된 유형을 불러올 수 있습니다.
 * 
 *    $gameMap.getCategory(x);
 *    - 현재 맵의 x번 속성에 대한 유형을 가져옵니다.
 * 
 * ============================================================================
 * 역사
 * ============================================================================
 * 
 * ver. 1.0.0:
 * - 플러그인 완성
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

PangI.Parameters = PluginManager.parameters('PangI_MapCategorization');
PangI.Param = PangI.Param || {};

PangI.Param.TypeNumbers = Number(PangI.Parameters['Type Numbers']);

//=============================================================================
// DataManager
//=============================================================================

DataManager.processMapCateNotetags = function() {
    if (!$dataMap || !$dataMap.note) return;

    $dataMap.category = Array(PangI.Param.TypeNumbers);
    var notedata = $dataMap.note.split((/[\r\n]+/));

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        var regexp = /<MAP Type (\d*) CATEGORY:[ ](.*)>/i
        var result = line.match(regexp);
        if (result) {
            var typeNumber = parseInt(result[1])-1;
            var categoryList = result[2].split(/, /);
            for (var j = 0; j < categoryList.length; j++) {
                var categoryName = categoryList[j];
                $dataMap.category[typeNumber] = categoryName;
            }
        }
    }
};

//=============================================================================
// Game_Map
//=============================================================================

PangI.MapCate.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    PangI.MapCate.Game_Map_setup.call(this, mapId);
    if ($dataMap) DataManager.processMapCateNotetags();
};

Game_Map.prototype.getCategory = function(typeNumber) {
    if (typeNumber < 1 || typeNumber > PangI.Param.TypeNumbers) {
        console.error(new RangeError('That map type does not exist.'));
    }

    if (!$dataMap.category) {
        DataManager.processMapCateNotetags();
    }

    return $dataMap.category[typeNumber-1];
};

//=============================================================================
// End of File
//=============================================================================