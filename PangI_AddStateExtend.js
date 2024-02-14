//=============================================================================
// PangI_AddStateExtend.js
//=============================================================================

var Imported = Imported || {};
Imported.PangI_AddStateExtend = true;

var PangI = PangI || {};
PangI.ASE = PangI.ASE || {};
PangI.ASE.version = '1.0.0';

/*:
 * @plugindesc ver. 1.0.0 상태이상 추가 함수 확장 플러그인 / The plugin that extend adding state
 * @author 팽이트위즈(PangI-Twise)
 *
 * @help 이 플러그인은 매개변수를 요구하지 않습니다.
 * 
 * =============================================================================
 * 상태이상 추가 함수
 * =============================================================================
 *
 * allAddState(그룹, 상태이상ID)
 *
 *  이 함수는 해당하는 그룹에게 특정 상태이상을 부여합니다.
 *  그룹이 0일 경우 플레이어 파티, 1일 경우 적 군단을 지정합니다.

 * allRemoveState(그룹, 상태이상ID)
 *
 *  이 함수는 해당하는 그룹에게서 특정 상태이상을 제거합니다.
 *  그룹이 0일 경우 플레이어 파티, 1일 경우 적 군단을 지정합니다.
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
// Function
//=============================================================================

var allAddState = function(group, stateId) {
 switch (group) {
  case 0:
   var group = $gameParty;
   break;
  case 1:
   var group = $gameTroop;
   break;
 }
 group.members().forEach(function(battler) {
  battler.addState(stateId);
 })
};

var allRemoveState = function(group, stateId) {
 switch (group) {
  case 0:
   var group = $gameParty;
   break;
  case 1:
   var group = $gameTroop;
   break;
 }
 group.members().forEach(function(battler) {
  battler.removeState(stateId);
 })
};

//=============================================================================
// End of File
//=============================================================================


